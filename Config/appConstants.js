'use strict';

var SERVER = {
    APP_NAME: 'OTP-SENDING-APP',
    PORTS: {
        HAPI: 8000
    },
    TOKEN_EXPIRATION_IN_MINUTES: 600,
    JWT_SECRET_KEY: 'hello',
    COUNTRY_CODE : '+91'
};

var DATABASE = {
    USER_ROLES: {
        ADMIN: 'ADMIN',
        CUSTOMER: 'CUSTOMER',
        DRIVER: 'DRIVER'
    }
};

var STATUS_MSG = {
    ERROR: {
        INVALID_OTP: {
            statusCode:401,
            type: 'INVALID_OTP',
            customMessage : 'Invalid OTP'
        },
        DB_ERROR: {
            statusCode:400,
            customMessage : 'DB Error : ',
            type : 'DB_ERROR'
        },
        APP_ERROR: {
            statusCode:400,
            customMessage : 'Application Error',
            type : 'APP_ERROR'
        },
        CONTACT_EXISTS:{
            statusCode:401,
            customMessage : 'Contact Exists',
            type : 'CONTACT_EXISTS'
        },
        CONTACT_DOESNT_EXISTS:{
            statusCode:402,
            customMessage : 'Contact Doesnt Exists',
            type : 'CONTACT_DOESNT_EXISTS'
        },

    },
    SUCCESS:{
        DEFAULT:{
            statusCode:200,
            type:'SUCCESS',
            customMessage:'Success'
        }
    }
};


var swaggerDefaultResponseMessages = [
    {code: 200, message: 'OK'},
    {code: 400, message: 'Bad Request'},
    {code: 401, message: 'Unauthorized'},
    {code: 404, message: 'Data Not Found'},
    {code: 500, message: 'Internal Server Error'}
];


var notificationMessages = {
    verificationCodeMsg: 'Your 4 digit verification code for OTP Application is {{four_digit_verification_code}}'
};


var APP_CONSTANTS = {
    SERVER: SERVER,
    DATABASE: DATABASE,
    STATUS_MSG: STATUS_MSG,
    notificationMessages: notificationMessages,
    swaggerDefaultResponseMessages: swaggerDefaultResponseMessages
};

module.exports = APP_CONSTANTS;
