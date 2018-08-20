'use strict';


let Controller = require('../Controllers');
let UniversalFunctions = require('../Utils/UniversalFunctions');
let Joi = require('joi');
let Config = require('../Config');


let adminLogin = [
    {
        method: 'POST'
        , path: '/api/admin/addContact'
        , handler: (request, reply) => {
        let payloadData = request.payload;
        Controller.AdminController.addContact(payloadData,(err, data) => {
            if (err) {
                reply(UniversalFunctions.sendError(err));
            } else {
                if (data.customMessage) {
                    reply(UniversalFunctions.sendSuccess(data, {}))
                }
                else {
                    reply(UniversalFunctions.sendSuccess(null, data))
                }
            }
        });
    }, config: {
        description: 'Add Contact',
        tags: ['api', 'admin', 'add contact'],
        validate: {
            payload: {
                contacts:Joi.object().keys({
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    countryCode:Joi.string().required(),
                    phoneNumber:Joi.number().required().min(10)
                  })
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
    },
    {
        method: 'GET'
        , path: '/api/admin/listContacts'
        , handler: (request, reply) => {
        var payloadData = request.query;
        Controller.AdminController.listContacts(payloadData, (err, data) => {
            if (err) {
                reply(UniversalFunctions.sendError(err));
            } else {
                if (data.customMessage) {
                    reply(UniversalFunctions.sendSuccess(data, {}))
                }
                else {
                    reply(UniversalFunctions.sendSuccess(null, data))
                }
            }
        });
    }, config: {
        description: 'List Contacts',
        tags: ['api', 'admin', 'list contacts'],
        validate: {
            query: {
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
    },
    {
        method: 'POST'
        , path: '/api/admin/sendMessage'
        , handler: (request, reply) => {
        var payloadData = request.payload;
        Controller.AdminController.sendMessage(payloadData, (err, data) => {
            if (err) {
                reply(UniversalFunctions.sendError(err));
            } else {
                if (data.customMessage) {
                    reply(UniversalFunctions.sendSuccess(data, {}))
                }
                else {
                    reply(UniversalFunctions.sendSuccess(null, data))
                }
            }
        });
    }, config: {
        description: 'Send Message/SMS',
        tags: ['api', 'admin', 'send message'],
        validate: {
            payload: {
                contactId: Joi.string().required(),
                message:Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
    },
    {
        method: 'GET'
        , path: '/api/admin/listMessages'
        , handler: (request, reply) => {
        var payloadData = request.query;
        Controller.AdminController.listMessages(payloadData, (err, data) => {
            if (err) {
                reply(UniversalFunctions.sendError(err));
            } else {
                if (data.customMessage) {
                    reply(UniversalFunctions.sendSuccess(data, {}))
                }
                else {
                    reply(UniversalFunctions.sendSuccess(null, data))
                }
            }
        });
    }, config: {
        description: 'List Messages',
        tags: ['api', 'admin', 'list messages'],
        validate: {
            query: {
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
    }

];


let authRoutes = [].concat(adminLogin);

module.exports = authRoutes;