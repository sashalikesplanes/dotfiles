Vim�UnDo� �/��R&�*�ʹ�'-<Z0��i��������  �                                   dX�     _�                              ����                                                                                                                                                                                                                                                                                                                                                             dX�     �              �   5import { Logger } from '@appjection-monorepo/logger';   8import { JsonObject } from '@appjection-monorepo/types';   import {     File,     FineTransferDlvServiceClient,   !  FINE_TRANSFER_DLV_SERVICE_NAME,     SubmissionRequest,   *} from '@appjection-monorepo/webform-dlv';   nimport { Body, Controller, Inject, Post, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';   )import { FastifyRequest } from 'fastify';   Eimport { catchError, firstValueFrom, retry, tap, timer } from 'rxjs';   *import { Transfer } from '../app/api.dto';   ?import { CallbackService } from '../callback/callback.service';   <import { ClientsService } from '../clients/clients.service';   Himport { ClientFirebaseIdTokenPayload } from '../clients/clients.types';   Bimport { EmailType, MailerTaskQueue } from '../mailer-task-queue';   Himport { TransformerService } from '../transformer/transformer.service';   +import { ApiV3Guard } from './apiV3.guard';   /import { ApiV3Service } from './apiV3.service';   yimport { ApiV3ResourceResponse, JsonApiResourceRequest, JsonApiResourceResponse, TicketAttributes } from './apiV3.types';   ;import { PARKING_CODES } from '../constants/parking-codes';       @UseGuards(ApiV3Guard)   @Controller('api-v3')   /**   + * Controller for callbacks from the api.v3   ) * Called from app/Services/V5/Client.php    */   export class ApiV3Controller {   :  private readonly logger = new Logger('ApiV3Controller');   =  /** Constructs the construction that must be constructed */     constructor(   /    private readonly callback: CallbackService,   5    private readonly transformer: TransformerService,   -    private readonly clients: ClientsService,   6    private readonly mailerTaskQueue: MailerTaskQueue,   )    private readonly apiv3: ApiV3Service,   h    @Inject(FINE_TRANSFER_DLV_SERVICE_NAME) private readonly fineTransfers: FineTransferDlvServiceClient     ) { }       K  /************************************************************************   J   ****************************** ROUTES *********************************   K   ***********************************************************************/         /**   &   * Trigger a callback to the client.   a   * Called from api.v3 when a new fine was created. It will trigger a callback to the client. If   R   * no callback url is provided, the httpbin cloud function should be configured.      */     @Post('created')   T  newTransfer(@Body() { data, included }: ApiV3ResourceResponse<TicketAttributes>) {   I    const transfer = this.transformer.resourceToTransfer(data, included);   T    const { callbackUrl } = this.clients.findByOrganisation(data.attributes.source);       .    this.logger.info('New transfer created', {   8      resourceId: [transfer.uuid, data.attributes.code],   2      perpetrationTime: transfer.perpetrationTime,         transfer,       });       .    this.callback.post(callbackUrl, transfer);     }         /**   &   * Trigger a callback to the client.   k   * Called from api.v3 when a fine receives a state, which could happen multiple times for the same state,   %   * if it is applied more than once.   h   * + It will trigger a patch callback to the client. If no callback url is provided, the httpbin cloud   #   * function should be configured.   /   * + It will submit to DLV conditions are met      */   	  @Post()   �  async updateClient(@Body() { data, included }: ApiV3ResourceResponse<TicketAttributes>, @Req() request: FastifyRequest): Promise<void> {   /    this.logger.info('Recieved state update', {   2      resourceId: [data.id, data.attributes.code],   -      state: data.attributes["state-latest"],         data,         included,       });       D    const transfer = this.transformToTransferOrFail(data, included);   /    const client = this.findClientOrFail(data);       6    this.callback.patch(client.callbackUrl, transfer);       '    this.logger.info('Handling case', {   J      resourceId: [transfer.uuid, JSON.stringify(transfer.entities.code)],         transfer,       });       9    if (!this.areRequiredAttributesSet(transfer, data)) {   .      this.logValidationError(transfer, data);   P      throw new UnprocessableEntityException('Required attributes are not set');       }       .    this.logger.info('Ready for submission', {   J      resourceId: [transfer.uuid, JSON.stringify(transfer.entities.code)],       });       ,    if (!this.shouldSubmit(data, request)) {   2      this.logger.info('This is a parking code', {   L        resourceId: [transfer.uuid, JSON.stringify(transfer.entities.code)],   	      });         return;       }       G    this.submitTransfer(client.clientId, { data, included }, transfer);     }         /**   !   * Trigger a win for a transfer   =   * Called from api.v3 when a fine first enters a win state.      */     @Post('win')   s  triggerWin(@Body() { data, included }: ApiV3ResourceResponse<TicketAttributes>, @Req() request: FastifyRequest) {   I    const transfer = this.transformer.resourceToTransfer(data, included);   K    const client = this.clients.findByOrganisation(data.attributes.source);           /**   P     * Note: This is a temporary solution to send the email for Check customers.   0     * This should be moved to the gRPC service.        */   U    this.logger.info('Trigger win', { resourceId: transfer.uuid, transfer, client });       if (   ,      data.attributes['state-phase'] == 1 &&          transfer.clientEntities &&   "      transfer.perpetrationTime &&   &      transfer.clientEntities.email &&   T      ((client.organisation === 'Check' && !request.hostname.includes('staging')) ||   -        client.organisation === 'appjection')       ) {   y      // if (transfer.clientEntities.email && client.organisation === 'Check' && !request.hostname.includes('staging')) {   [      this.logger.info('Add email task to queue after win', { resourceId: transfer.uuid });   $      this.mailerTaskQueue.addTask({   .        emailType: EmailType.TRANSFER_SUCCESS,   4        to: transfer.clientEntities.email as string,            fineType: transfer.type,   4        perpetrationTime: transfer.perpetrationTime,   *        numberPlate: transfer.numberPlate,   C        location: transfer.entities.location as string | undefined,   C        factcode: transfer.entities.factcode as string | undefined,   $        source: client.organisation,   K        firstName: transfer.clientEntities.firstName as string | undefined,   I        lastName: transfer.clientEntities.lastName as string | undefined,   $        transferUuid: transfer.uuid,   0        reference: transfer.appjectionReference,   	      });       }     }       K  /************************************************************************   K   ****************************** HELPERS *********************************   K   ***********************************************************************/         /**   f   * Submit a transfer to the DLV. Extracted here to keep code readable. Called from updateClient only      * when conditions are met      *   V   * NOTE: included is ignored as we will download the files from the api.v3 ourselves      */   \  private async submitTransfer(clientId: string, { included: _ }: any, transfer: Transfer) {   8    const user = this.buildClientTokenPayload(clientId);       3    this.logger.info(`START SUBMITTING TRANSFER`, {   J      resourceId: [transfer.uuid, JSON.stringify(transfer.entities.code)],   2      perpetrationTime: transfer.perpetrationTime,         transfer,       });       v    const { authorizationFile, files } = await firstValueFrom(this.apiv3.downloadSubmissionFiles(transfer, user).pipe(   -      // Files may not be ready in gdrive yet   '      retry({ count: 3, delay: 5000 }),   ;      tap((files) => this.logger.info('Files downloaded', {   L        resourceId: [transfer.uuid, JSON.stringify(transfer.entities.code)],   o        files: { authorizationFile: files.authorizationFile.name, files: files.files.map((file) => file.name) }   
      })),   &      catchError((error: unknown) => {   6        this.logger.error('Error downloading files', {   N          resourceId: [transfer.uuid, JSON.stringify(transfer.entities.code)],           }, error);           throw error;   	      }),       ));       9    const cjibNumber = transfer.entities.code.toString();   s    const request: SubmissionRequest = this.buildSubmissionRequest(cjibNumber, transfer, files, authorizationFile);       	    try {   k      this.logger.info('Starting submit to webform', { resourceId: [transfer.uuid, cjibNumber], request });   D      const { success, message, screenshot } = await firstValueFrom(   ,        // TODO use the library for retrying   6        this.fineTransfers.submitPhase1(request).pipe(   p          // If the notifier completes _without_ emitting, the resulting observable will complete without error,   L          // if the notifier errors, the error will be pushed to the result.             retry({               count: 3,   2            delay: (error: Error, retryCount) => {   :              const message = error.message.toLowerCase();   %              const networkErrors = [   )                'upstream connect error',   )                'connection termination',   !                'socket hang up',   %                'connection dropped',   "                'read econnreset',   !                '14 unavailable',   7                'upstream max stream duration reached',                 ];   Y              if (networkErrors.some((networkError) => message.includes(networkError))) {   ?                this.logger.warn('Retrying after gRPC error', {   (                  errorMessage: message,   ,                  resourceId: transfer.uuid,                     cjibNumber,                     retryCount,                   });   B                return timer(retryCount * 3000); // linear backoff                 }       C              // Log as an error only after we decided not to retry                  this.logger.error(   :                'Error on submitting transfer to phase 1',                   {   ,                  resourceId: transfer.uuid,                     cjibNumber,                   },                   error                 );                 throw error;               },             })   	        )         );       v      this.logger.info('FT dlv returned', { success, submitMessage: message, resourceId: transfer.uuid, cjibNumber });         if (!screenshot) {   ^        this.logger.warn('No screenshot returned', { resourceId: transfer.uuid, cjibNumber });         } else {   T        this.apiv3.addSubmissionScreenshotFile(transfer, user, screenshot, success);         }             if (!success) {   M        this.logger.warn('Not submitting a new state as submission failed', {   $          resourceId: transfer.uuid,   !          submitMessage: message,   !          submitSuccess: success,             cjibNumber,           });           return;         }       9      this.apiv3.addIngediendPhase1State(transfer, user);       } catch (err) {         this.logger.error(   0        'Automated submission to webform error',   	        {   2          resourceId: [transfer.uuid, cjibNumber],   
        },           err         );       }     }         /**   .   * Prepare the submission request and log it      */   r  private buildSubmissionRequest(cjibNumber: string, transfer: Transfer, files: File[], authorizationFile: File) {   (    const request: SubmissionRequest = {         attributes: {           cjibNumber,   m        // @ts-ignore, we have checked that perpetrationTime is defined in updateClients, this should be safe   7        perpetratedDatetime: transfer.perpetrationTime,         },         files,         authorizationFile,       };       // log the request   -    this.logger.info('Submitting transfer', {          resourceId: transfer.uuid,   8      appjectionReference: transfer.appjectionReference,         cjibNumber,       });       return request;     }         /**   J   * A user parameter is needed to access ApiV3, but we don't have a user.      */   S  private buildClientTokenPayload(clientId: string): ClientFirebaseIdTokenPayload {       return {         name: '',         picture: '',         auth_time: -1,         user_id: '',         email: '',         email_verified: false,         firebase: {           identities: {},           sign_in_provider: '',         },         claims: {           clientId: clientId,         },       };     }         /**   ?   * Log the error that caused the transfer to not be submitted      */   b  private logValidationError(transfer: Transfer, data: JsonApiResourceRequest<TicketAttributes>) {       let errors: string[] = [];   "    if (!transfer.entities.code) {   3      errors.push('Missing required field: code ');       }    %    if (!transfer.perpetrationTime) {   ?      errors.push('Missing required field: perpetrationTime ');       }    &    if (!transfer.entities.factcode) {   7      errors.push('Missing required field: factcode ');       }    ;    if (data.attributes['state-latest'] !== 'Beoordelen') {   9      errors.push('Not the right state ("Beoordelen") ');       }    .    if (data.attributes['state-phase'] != 1) {   X      // not the double (==) due to a weird issue in api.v3 sometimes returning a string         // and sometimes a number   .      errors.push('Not the right phase (1) ');       }    -    if (transfer.createTime > '2022-11-18') {   @      errors.push('Transfer too old for automated submission ');       }       this.logger.warn(   )      'Skipping due to invalid transfer',         {   "        resourceId: transfer.uuid,   %        code: transfer.entities.code,           errors,         }       );     }         /**   -   * Check if the required attributes are set      */   h  private areRequiredAttributesSet(transfer: Transfer, data: JsonApiResourceRequest<TicketAttributes>) {       return (   =      transfer.entities.code && // cjib code required for dlv   C      transfer.perpetrationTime && // perpetration required for dlv   P      transfer.entities.factcode && // factcode required for parking check below   $      // check for the proper values   9      data.attributes['state-latest'] === 'Beoordelen' &&   T      // note the double equals. In some cases api.v3 returns a "1" rather than a 1.   ,      data.attributes['state-phase'] == 1 &&   8      // data.attributes['created-at'] > '2022-11-18' &&   (      transfer.createTime > '2022-11-18'       );     }         /**   +   * Checks if the fine should be submitted   >   *   - parking codes should never be submitted automatically   <   *   - also do not submit if we are in staging environment      */   a  private shouldSubmit(data: JsonApiResourceRequest<TicketAttributes>, request: FastifyRequest) {   x    return false === PARKING_CODES.includes(data.attributes.factcode) && false === request.hostname.includes('staging');     }         /**   p   * Try to map the resource to a transfer. If it fails, log the error and throw an UnprocessableEntityException   =   * @throws UnprocessableEntityException (equivalent to 422)      */   $  private transformToTransferOrFail(   4    data: JsonApiResourceResponse<TicketAttributes>,   3    included: JsonApiResourceResponse<JsonObject>[]     ): Transfer {   	    try {   A      return this.transformer.resourceToTransfer(data, included);       } catch (err) {         this.logger.error(   2        'Error transforming resource to transfer',   	        {   6          resourceId: [data.id, data.attributes.code],   1          state: data.attributes["state-latest"],             data,   
        },           err         );   _      throw new UnprocessableEntityException('Invalid transfer error: ' + JSON.stringify(err));       }     }         /**   r   * Try to find the client for the transfer. If it fails, log the error and throw an UnprocessableEntityException   =   * @throws UnprocessableEntityException (equivalent to 422)      */   M  private findClientOrFail(data: JsonApiResourceResponse<TicketAttributes>) {   	    try {   E      return this.clients.findByOrganisation(data.attributes.source);       } catch (e) {   -      this.logger.error('Client not found', {   4        resourceId: [data.id, data.attributes.code],   '        source: data.attributes.source,   /        state: data.attributes["state-latest"],           data,   	      });   l      throw new UnprocessableEntityException(`Client not found for organisation ${data.attributes.source}`);       }     }   }5�5��