Vim�UnDo� q�4|����:���ϱ�l�+���K+:~����   �                 
       
   
   
    d�J    _�                     I   "    ����                                                                                                                                                                                                                                                                                                                                                             d�a     �   I   K            �   I   K      5��    I                                           �    I                                          5�_�                    J       ����                                                                                                                                                                                                                                                                                                                                                             d�d     �   I   K            console.warn5��    I                     (                     5�_�                    J       ����                                                                                                                                                                                                                                                                                                                                                             d�d    �   I   K            console.warn()5��    I                     )                     �    I                    )                    �    I                    )                    �    I                    )                    �    I                    )                    5�_�                    J        ����                                                                                                                                                                                                                                                                                                                                                             d�{    �   I   J          !    console.warn(callbackMessage)5��    I                            "               5�_�                    =       ����                                                                                                                                                                                                                                                                                                                                                             d�~    �   <   >        j	it("should deliver the message to the dead letter topic if the callback repeatedly errors", async () => {5��    <                     �
                     5�_�                    =       ����                                                                                                                                                                                                                                                                                                                                                             d�    �   <   >        o	it.skip("should deliver the message to the dead letter topic if the callback repeatedly errors", async () => {5��    <                     �
                     5�_�                    �        ����                                                                                                                                                                                                                                                                                                                            �          �          V       d�2    �   �   �          		"/server-returns-301": {   			method: "POST",   G			handler: jest.fn(async (_: FastifyRequest, reply: FastifyReply) => {   .				reply.code(301).send("Moved Permanently");   			}),   		},5��    �                      X      �               5�_�      	              k       ����                                                                                                                                                                                                                                                                                                                            �          �          V       d�6    �   j   k          	| "/server-returns-301";5��    j                      �                     5�_�      
           	   F        ����                                                                                                                                                                                                                                                                                                                            F           O          V       d�;    �   E   F       
       b	it("should fail to deliver the message if the returned code is not a success code", async () => {   4		const path: CallbackPaths = "/server-returns-301";   .		const callbackMessage = createMessage(path);       5		await callbacksClientService.call(callbackMessage);   '		await waitForPubsubMessageDelivery();       o		await expectPubsubSubscriptionToHaveBeenCalledWith(CALLBACKS_DEAD_LETTER_SUBSCRIPTION_NAME, callbackMessage);   	});5��    E       
               P      �              5�_�   	               
   F        ����                                                                                                                                                                                                                                                                                                                            F           F          V       d�I     �               �   2import { INestApplication } from "@nestjs/common";   6import { Test, TestingModule } from "@nestjs/testing";   /import { NestApplication } from "@nestjs/core";   +import { spawn } from "node:child_process";   7import { ChildProcess, execSync } from "child_process";   !import { promisify } from "util";   wimport { CallbackMessage, CallbacksClientModule, CallbacksClientService } from "@appjection-monorepo/callbacks-client";   .import { PubSub } from "@google-cloud/pubsub";   ?import { CallbacksModule } from "./callbacks/callbacks.module";   mimport { fastify, FastifyInstance, FastifyReply, FastifyRequest, RouteHandler, RouteOptions } from "fastify";       $const CALLBACK_RECIEVER_PORT = 6969;   const PUBSUB_PORT = 42069;   #const PUBSUB_PROJECT = "test-test";   )const CALLBACKS_TOPIC_NAME = "callbacks";   Aconst CALLBACKS_DEAD_LETTER_TOPIC_NAME = "callbacks-dead-letter";   Lconst CALLBACKS_DEAD_LETTER_SUBSCRIPTION_NAME = "callbacks-dead-letter-sub";   4const CALLBACKS_SUBSCRIPTION_NAME = "callbacks-sub";   ?const PUBSUB_EMULATOR_HOST = `http://localhost:${PUBSUB_PORT}`;   setupEnvVars();       $describe("PubSub Callbacks", () => {   e	// APPLICATION UNDER TEST - The service which will call the callbacks, need a handle to shut it down   (	let callbacksService: INestApplication;   a	// The service which will be used to initiate the callbacks, need a handle to initiate callbacks   4	let callbacksClientService: CallbacksClientService;   M	// Module wrapping the callbacksClientService, need a handle to shut it down   *	let callbacksClientModule: TestingModule;   E	// Necessary, as we need access to the handler in order to spy on it   	let routes: Routes;   O	// The service which will recieve the callbacks, need a handle to shut it down   	let server: FastifyInstance;   Z	// The PubSub emulator - for callbacksClientService to communicate with callbacksService,   $	//    need a handle to shut it down   !	let pubsubProcess: ChildProcess;       	it("should exist", () => {   ;		expect(callbacksService).toBeInstanceOf(NestApplication);   	});       c	it("should call the callback, which returns success and requires no authentication", async () => {   3		const path: CallbackPaths = "/succesful-no-auth";   .		const callbackMessage = createMessage(path);       5		await callbacksClientService.call(callbackMessage);   '		await waitForPubsubMessageDelivery();       K		expectHandlerToHaveBeenCalledWith(routes[path].handler, callbackMessage);   	});       m	it("should call the callback, which returns server error once and requires no authentication", async () => {   ;		const path: CallbackPaths = "/server-error-once-no-auth";   .		const callbackMessage = createMessage(path);       5		await callbacksClientService.call(callbackMessage);   '		await waitForPubsubMessageDelivery();       K		expectHandlerToHaveBeenCalledWith(routes[path].handler, callbackMessage);   	});       j	it("should deliver the message to the dead letter topic if the callback repeatedly errors", async () => {   5		const path: CallbackPaths = "/server-error-always";   .		const callbackMessage = createMessage(path);       5		await callbacksClientService.call(callbackMessage);   '		await waitForPubsubMessageDelivery();       o		await expectPubsubSubscriptionToHaveBeenCalledWith(CALLBACKS_DEAD_LETTER_SUBSCRIPTION_NAME, callbackMessage);   	});       	beforeAll(async () => {   M		pubsubProcess = await createPubsubProcessTopicAndSubscription(PUBSUB_PORT);       8		const callbacksClient = await createCallbacksClient();   .		callbacksClientService = callbacksClient[0];   -		callbacksClientModule = callbacksClient[1];       		routes = createRoutes();   <		server = createHttpServer(routes, CALLBACK_RECIEVER_PORT);       4		callbacksService = await createCallbacksService();   	});       	afterAll(async () => {   !		await callbacksService.close();   &		await callbacksClientModule.close();   		pubsubProcess.kill();   /		await promisify(server.close.bind(server))();   	});   });       1/** Auxilary types for typechecking the routes */   type CallbackPaths =   	| "/succesful-no-auth"   	| "/server-error-once-no-auth"   	| "/server-error-always"   ?type Routes = Record<CallbackPaths, Omit<RouteOptions, "url">>;       H/** Necessary, as we need access to the handler in order to spy on it */   !function createRoutes(): Routes {   #	let serverErrorOnceNumOfCalls = 0;   		return {   		"/succesful-no-auth": {   			method: "POST",   G			handler: jest.fn(async (_: FastifyRequest, reply: FastifyReply) => {   				reply.code(200).send("OK");   			}),   		},   !		"/server-error-once-no-auth": {   			method: "POST",   G			handler: jest.fn(async (_: FastifyRequest, reply: FastifyReply) => {   *				if (serverErrorOnceNumOfCalls === 0) {   3					reply.code(500).send("Internal Server Error");   				} else {    					reply.code(200).send("OK");   				}   #				serverErrorOnceNumOfCalls += 1;   			}),   		},   		"/server-error-always": {   			method: "POST",   G			handler: jest.fn(async (_: FastifyRequest, reply: FastifyReply) => {   2				reply.code(500).send("Internal Server Error");   			}),   		},   	};   }       ;/** Create a simple Fastify server with the given routes */   Jfunction createHttpServer(routes: Routes, port: number): FastifyInstance {   	const server = fastify();       C	for (const [url, { method, handler }] of Object.entries(routes)) {   )		server.route({ url, method, handler });   	}       	server.listen({ port });   	return server;   }       L/** Setup pubsub and configure all the necessary topics and subscriptions */   Fasync function createPubsubProcessTopicAndSubscription(port: number) {   )	console.log("Starting to setup Pubsub");   	const process = spawn(   		"gcloud",   k		["beta", "emulators", "pubsub", "start", `--project=${PUBSUB_PROJECT}`, `--host-port=localhost:${port}`],   		{   			stdio: "ignore",   		},   	);       *	// Ping pubsub emulator until it is ready   I	execSync(`while ! nc -z localhost ${port}; do sleep 0.1; done; exit 0`);       B	const pubsub: PubSub = new PubSub({ projectId: PUBSUB_PROJECT });       B	// PubSub emulator resets state inconsistently. Reset it manually   6	const existingTopics = (await pubsub.getTopics())[0];   B	await Promise.all(existingTopics.map((topic) => topic.delete()));   D	const existingSubscriptions = (await pubsub.getSubscriptions())[0];   E	await Promise.all(existingSubscriptions.map((sub) => sub.delete()));       L	const callbacksTopic = (await pubsub.createTopic(CALLBACKS_TOPIC_NAME))[0];   Y	const deadLetterTopic = (await pubsub.createTopic(CALLBACKS_DEAD_LETTER_TOPIC_NAME))[0];   S	await deadLetterTopic.createSubscription(CALLBACKS_DEAD_LETTER_SUBSCRIPTION_NAME);   G	await callbacksTopic.createSubscription(CALLBACKS_SUBSCRIPTION_NAME, {   		deadLetterPolicy: {   )			deadLetterTopic: deadLetterTopic.name,   			maxDeliveryAttempts: 10,   		},   	});       B	await pubsub.close(); // close the client to prevent interference   	console.log("Pubsub ready");   	return process;   }       '/** Launch the callbacks application */   )async function createCallbacksService() {   7	const testingModule = await Test.createTestingModule({   		imports: [CallbacksModule],   		providers: [],   	}).compile();       .	return testingModule.createNestApplication();   }       4/** Create a client for the callbacks application */   Zasync function createCallbacksClient(): Promise<[CallbacksClientService, TestingModule]> {   7	const testingModule = await Test.createTestingModule({   #		imports: [CallbacksClientModule],   		providers: [],   	}).compile();   J	const callbacksClientService = testingModule.get(CallbacksClientService);       0	return [callbacksClientService, testingModule];   }       G/** It takes some time for PubSub to recieve and publish the message */   /async function waitForPubsubMessageDelivery() {   ,	const PUBSUB_MESSAGE_DELIVERY_DELAY = 1000;   T	await new Promise((resolve) => setTimeout(resolve, PUBSUB_MESSAGE_DELIVERY_DELAY));   }       1/** Set up environment variables for the tests */   function setupEnvVars() {   "	// Needed for the pubsub emulator   3	process.env.GOOGLE_CLOUD_PROJECT = PUBSUB_PROJECT;   :	// Needed for callbacksHandler to know where to subscribe   4	process.env.CALLBACKS_TOPIC = CALLBACKS_TOPIC_NAME;   >	// Needed for callbacksClientService to know where to publish   B	process.env.CALLBACKS_SUBSCRIPTION = CALLBACKS_SUBSCRIPTION_NAME;   F	// Needed for PubSub NodeJS client to know that we are using emulator   9	process.env.PUBSUB_EMULATOR_HOST = PUBSUB_EMULATOR_HOST;   }       J/** Assert that the handler has been called with the expected arguments */   ]function expectHandlerToHaveBeenCalledWith(handler: RouteHandler, message: CallbackMessage) {   &	expect(handler).toHaveBeenCalledWith(   		expect.objectContaining({   			body: message.body,   		}),   		expect.anything(),   	);   }        /** Create a callback message */   7function createMessage(path: string): CallbackMessage {   		return {   ;		url: `http://localhost:${CALLBACK_RECIEVER_PORT}${path}`,   			body: {   			message: "Hello World",   		},   		method: "post",   	} as const;   }       8/** Assert that a pubsub topic has recieved a message */   <async function expectPubsubSubscriptionToHaveBeenCalledWith(   	subscriptionName: string,   "	callbackMessage: CallbackMessage,   ) {   	const pubsub = new PubSub({   		projectId: PUBSUB_PROJECT,   	});   	await new Promise((r) => {   D		pubsub.subscription(subscriptionName).on("message", (message) => {   L			expect(message.data.toString()).toEqual(JSON.stringify(callbackMessage));   			message.ack();   			r(true);   		});   	});   }5�5��