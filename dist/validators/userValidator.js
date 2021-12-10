"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putObjValidator = exports.postObjValidator = void 0;
const constants_1 = require("../constants/constants");
const errors_1 = require("../constants/errors");
const postObjValidator = (obj) => {
    if (typeof obj !== 'object')
        throw { message: errors_1.ERRORS.NOT_AN_OBJECT, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!obj.hasOwnProperty('name'))
        throw { message: errors_1.ERRORS.NAME_NOT_ENTERED, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (typeof obj.name !== 'string')
        throw { message: errors_1.ERRORS.NAME_NOT_A_STRING, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!obj.hasOwnProperty('login'))
        throw { message: errors_1.ERRORS.LOGIN_NOT_ENTERED, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (typeof obj.login !== 'string')
        throw { message: errors_1.ERRORS.LOGIN_IS_NOT_A_STRING, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!obj.hasOwnProperty('password'))
        throw { message: errors_1.ERRORS.PASSWORD_NOT_ENTERED, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (typeof obj.password !== 'string')
        throw { message: errors_1.ERRORS.PASSWORD_NOT_STRING, status: constants_1.STATUS_CODES.BAD_REQUEST };
};
exports.postObjValidator = postObjValidator;
const putObjValidator = (obj) => {
    if (typeof obj !== 'object') {
        return errors_1.ERRORS.NOT_AN_OBJECT;
    }
    if (obj.hasOwnProperty('name') && typeof obj.name !== 'string') {
        return errors_1.ERRORS.NAME_NOT_A_STRING;
    }
    ;
    if (obj.hasOwnProperty('login') && typeof obj.login !== 'string') {
        return errors_1.ERRORS.LOGIN_IS_NOT_A_STRING;
    }
    ;
    if (obj.hasOwnProperty('password') && typeof obj.password !== 'string') {
        return errors_1.ERRORS.PASSWORD_NOT_STRING;
    }
    ;
};
exports.putObjValidator = putObjValidator;
//# sourceMappingURL=userValidator.js.map