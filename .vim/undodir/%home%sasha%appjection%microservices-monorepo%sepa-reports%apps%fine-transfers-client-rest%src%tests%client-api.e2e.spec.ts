Vim�UnDo� ��Q����m��?�m�1�O���L�w���se  �   E  // NOTE must be in order as dependant on global state in staging db   _                          dc_    _�                            ����                                                                                                                                                                                                                                                                                                                                                             dc^�     �        �      >const env = global.TEST_ENV === 'local' ? 'local' : 'staging';5��                        �                    5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             dc^�     �        �      >const env = global.TEST_ENV `== 'local' ? 'local' : 'staging';5��                        �                    5�_�                       !    ����                                                                                                                                                                                                                                                                                                                                                             dc^�    �   �   �  �            �        �      >const env = global.TEST_ENV !== 'local' ? 'local' : 'staging';5��       !                 �                    �    �                      �                     5�_�                    _        ����                                                                                                                                                                                                                                                                                                                                                             dc_    �        �      ^ * NOTE, make sure that the account in GOOGLE_APPLICATION_CREDENTIALS has the following roles:�        �       * - Logging view access�        �       *�        �      R * NOTE, these tests rely on the state of staging apiv3, they must be run in order�        �       */�   %   '  �      0 * This is all derived from the fine file itself�   &   (  �      2 *   apart from the uuid which will be added later�   '   )  �       *�   (   *  �      > * On `local` time is in CET/CEST, in Cloud Run time is in UTC�   )   +  �      J * Data from ApiV3 is datetime with no timestamps which we parse using the�   *   ,  �      I * Date() function, so the result depends on the timezone of this service�   +   -  �       */�   J   L  �      % * End to End test for the Client API�   K   M  �      [ * @see https://blog.logrocket.com/end-end-testing-nestjs-typeorm/#end-to-end-tests-nest-js�   L   N  �       */�   g   i  �        * Submit a new fine to transfer�   h   j  �       */�   �   �  �      - * Tests the adding of a file to the transfer�   �   �  �       */�   �   �  �      R * Tests the adding of textual information to the transfer using information route�   �   �  �       */�   �   �  �      U * Tests the adding of textual information to the transfer using cliententities route�   �   �  �       */�  .  0  �      3 * Tests that the original upload can be downloaded�  /  1  �       */�  F  H  �       * Wrapper for making a request�  G  I  �       */�  Z  \  �          [method](uri)�  b  d  �      G * Wait 10 seconds for the logs to come in, then get the latest entries�  c  e  �      K * select the body of the latest entry that matches the globalUuidReference�  d  f  �       */�  u  w  �      F * Assert that the fine data recieved is the same as the expected data�  v  x  �      / * and assert that the right files are included�  w  y  �       */�   I  \  �         /**   % * End to End test for the Client API   [ * @see https://blog.logrocket.com/end-end-testing-nestjs-typeorm/#end-to-end-tests-nest-js    */   jest.setTimeout(15_000);   :describe('Fine Transfer Client REST API v4 (e2e)', () => {   &  let ftcrApp: NestFastifyApplication;   %  let cliApp: NestFastifyApplication;         beforeAll(async () => {   U    // @ts-ignore - i know this is a const check, yet I want it there for ease of use   o    if (env === 'local') ftcrApp = await bootstrap(FtcrAppModule, { globalPrefix: 'v4', port: ftcrLocalPort });   C    cliApp = await bootstrap(CliAppModule, { port: cliLocalPort });     });         afterAll(async () => {   U    // @ts-ignore - i know this is a const check, yet I want it there for ease of use   /    if (env === 'local') await ftcrApp.close();       await cliApp.close();     });       E  // NOTE must be in order as dependant on global state in staging db   (  describe('Submit a file', submitFile);   =  describe('Add a file to the transfer', addFileInformation);   ]  describe('Add a textual data to the transfer using information route', addJsonInformation);   _  describe('Add a textual data to the transfer using cliententities route', addClientEntities);   A  describe('Download the original file', downloadOriginalUpload);   });       /**     * Submit a new fine to transfer    */   function submitFile() {     const expectedFineData = {   .    state: 'ACTION_REQUIRED', // Initial state   *    clientEntities: {}, // should be empty   !    ...COMMON_EXPECTED_FINE_DATA,     };       C  it('should succesfully submit the file to the api', async () => {   M    const file = await readFile(join(__dirname, 'fines', 'R555.jpg.base64'));   )    // Submit a file to become a transfer   &    const testFineData: CreateFine = {         file: file.toString(),         country: 'NL',       };       g    const response = await makeAuthRequest('post', '/v4/transfers', testFineData, HttpStatus.ACCEPTED);       E    const { body }: { body: { id: string; uri: string } } = response;   E    expect(body).toHaveProperty('uri'); // the link to the submission   B    expect(body).toHaveProperty('id'); // the id of the submission   E    expect(body.uri).toEqual(`${ftcrUri}/v4/submissions/${body.id}`);   "    globalUuidReference = body.id;       -    // update the expected data with the uuid   0    expectedFineData.uuid = globalUuidReference;     });       E  it('should post the transfer to the client callback', async () => {   9    const binData = await waitForLatestLogMatchingUuid();       6    // POST callback DOES NOT include originalUpload??   i    assertFineData(binData, expectedFineData as Transfer, { originalUpload: false, testInvoice: false });     });       >  it('should have the transfer in the database', async () => {   a    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for the database to update   t    const response = await makeAuthRequest('get', `/v4/transfers/${globalUuidReference}`, undefined, HttpStatus.OK);       n    assertFineData(response.body, expectedFineData as Transfer, { originalUpload: true, testInvoice: false });     });   }       /**   - * Tests the adding of a file to the transfer    */   function addFileInformation() {     const expectedFineData = {   0    // State has changed BECAUSE we added a file       state: 'PROCESSING',   &    clientEntities: {}, // Still empty   !    ...COMMON_EXPECTED_FINE_DATA,     };       3  it('should add a file to the fine', async () => {   -    // update the expected data with the uuid   0    expectedFineData.uuid = globalUuidReference;           const testFileData = {          name: 'Test invoice.jpeg',         type: 'image/jpeg',   \      file: (await readFile(join(__dirname, 'information', 'test.jpeg.base64'))).toString(),       };       +    const response = await makeAuthRequest(         'post',   9      `/v4/transfers/${globalUuidReference}/information`,         testFileData,         HttpStatus.ACCEPTED       );       &    expect(response.text).toBeFalsy();     });       I  it('should patch a status update to the client callback', async () => {   F    // This callback is called directly by ApiV3 so no time conversion       const expectedFineData = {   2      // State has changed BECAUSE we added a file         state: 'PROCESSING',   (      clientEntities: {}, // Still empty   (      ...COMMON_EXPECTED_FINE_DATA_CEST,           };       0    expectedFineData.uuid = globalUuidReference;       9    const binData = await waitForLatestLogMatchingUuid();   g    assertFineData(binData, expectedFineData as Transfer, { testInvoice: true, originalUpload: true });     });       >  it('should have the transfer in the database', async () => {   a    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for the database to update   t    const response = await makeAuthRequest('get', `/v4/transfers/${globalUuidReference}`, undefined, HttpStatus.OK);       m    assertFineData(response.body, expectedFineData as Transfer, { testInvoice: true, originalUpload: true });     });   }       /**   R * Tests the adding of textual information to the transfer using information route    */   function addJsonInformation() {     const expectedFineData = {   0    // State has changed BECAUSE we added a file       state: 'PROCESSING',       // Not empty now       clientEntities: {   $      email: 'gerrit@appjection.nl',         firstName: 'Gerrit Jan',         lastName: 'van Ahee',       },   !    ...COMMON_EXPECTED_FINE_DATA,     };     const testJsonData = {   "    email: 'gerrit@appjection.nl',       firstName: 'Gerrit Jan',       lastName: 'van Ahee',     };       3  it('should add a file to the fine', async () => {   +    const response = await makeAuthRequest(         'post',   9      `/v4/transfers/${globalUuidReference}/information`,         testJsonData,         HttpStatus.ACCEPTED       );           // the response is empty   &    expect(response.text).toBeFalsy();   0    expectedFineData.uuid = globalUuidReference;     });       3  // adding text data will not cause a state change   G  it('should NOT patch an update to the client callback', async () => {   9    const binData = await waitForLatestLogMatchingUuid();       $    expect(binData).toBeUndefined();     });       >  it('should have the transfer in the database', async () => {   a    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for the database to update       t    const response = await makeAuthRequest('get', `/v4/transfers/${globalUuidReference}`, undefined, HttpStatus.OK);       m    assertFineData(response.body, expectedFineData as Transfer, { originalUpload: true, testInvoice: true });     });   }       /**   U * Tests the adding of textual information to the transfer using cliententities route    */   function addClientEntities() {     const expectedFineData = {   0    // State has changed BECAUSE we added a file       state: 'PROCESSING',       clientEntities: {         // Previous data kept   $      email: 'gerrit@appjection.nl',         firstName: 'Gerrit Jan',         lastName: 'van Ahee',         // new data added         sasha: '42069',       },   !    ...COMMON_EXPECTED_FINE_DATA,     };     const testJsonData = {       sasha: '42069',     };       3  it('should add a file to the fine', async () => {   +    const response = await makeAuthRequest(         'post',   <      `/v4/transfers/${globalUuidReference}/cliententities`,         testJsonData,         HttpStatus.ACCEPTED       );       &    expect(response.text).toBeFalsy();   -    // update the expected data with the uuid   0    expectedFineData.uuid = globalUuidReference;     });       3  // adding text data will not cause a state change   G  it('should NOT patch an update to the client callback', async () => {   9    const binData = await waitForLatestLogMatchingUuid();       $    expect(binData).toBeUndefined();     });       >  it('should have the transfer in the database', async () => {   a    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for the database to update       t    const response = await makeAuthRequest('get', `/v4/transfers/${globalUuidReference}`, undefined, HttpStatus.OK);       m    assertFineData(response.body, expectedFineData as Transfer, { originalUpload: true, testInvoice: true });     });   }       /**   3 * Tests that the original upload can be downloaded    */   #function downloadOriginalUpload() {   9  it('should download the original upload', async () => {   +    const response = await makeAuthRequest(         'get',   8      `/v4/transfers/${globalUuidReference}/files/fine`,         undefined,         HttpStatus.OK       );       M    const file = await readFile(join(__dirname, 'fines', 'R555.jpg.base64'));   -    expect(response.type).toBe('image/jpeg');   H    // take hash of the file, and compare it to the hash of the response   I    const originalHash = createHash('sha256').update(file).digest('hex');   R    const responseHash = createHash('sha256').update(response.body).digest('hex');       X    // These should be equal but they are not, maybe there is some compression going on?   6    // expect(file.length).toBe(response.body.length);   /    // expect(originalHash).toBe(responseHash);     });   }       /**    * Wrapper for making a request    */   async function makeAuthRequest(     method: 'post' | 'get',     uri: string,   /  payload: CreateFine | JsonObject | undefined,     responseStatus: HttpStatus   ) {   8  // get a bearer token for testing, from localhost only   !  let response: request.Response;     try {   V    response = await request(cliUri).get('/jwt/d2fb7dc9-88be-4df5-b587-a487a5ba6568');     } catch (err) {   O    throw new Error('Coudl not get bearer token, is the cli serivce running?');     }     const bearer = response.text;   j  // Reset the now time. Each time a callback will be triggered as a side effect, the time should be reset   !  now = new Date().toISOString();         return request(ftcrUri)     [method](uri)5��    I                  �
      P$      P$      �    w                    �2                    �    v                    �2                    �    u                    h2                    �    d                    /0                    �    c                    �/                    �    b                    �/                    �    Z                    �.                    �    G                    q,                    �    F                    Q,                    �    /                     )                    �    .                    �(                    �    �                     ]#                    �    �                     #                    �    �                     z                    �    �                     '                    �    �                     a                    �    �                     3                    �    h                     �                    �    g                     v                    �    L                     /                    �    K                     �
                    �    J                     �
                    �    +                                         �    *                     �                    �    )                     q                    �    (                     2                    �    '                     /                    �    &                     �                    �    %                     �                    �                         �                    �                         J                    �                         G                    �                         .                    �                         �                    5�_�                     _        ����                                                                                                                                                                                                                                                                                                                                                             dc_     �   _   `  �    �   ^   `  �      J local // NOTE must be in order as dependant on global state in staging db5��    ^                     �                     5��