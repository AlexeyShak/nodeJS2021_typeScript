"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBoardObjValidator = exports.postBoardObjValidator = void 0;
const constants_1 = require("../constants/constants");
const errors_1 = require("../constants/errors");
const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const postBoardObjValidator = (obj) => {
    if (typeof obj !== 'object')
        throw { message: errors_1.ERRORS.NOT_AN_OBJECT, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!obj.hasOwnProperty('title'))
        throw { message: errors_1.ERRORS.TITLE_NOT_ENTERED, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (typeof obj.title !== 'string')
        throw { message: errors_1.ERRORS.TITLE_NOT_A_STRING, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!obj.hasOwnProperty('columns'))
        throw { message: errors_1.ERRORS.COLUMNS_NOT_ENTERED, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!Array.isArray(obj.columns))
        throw { message: errors_1.ERRORS.COLUMNS_IS_NOT_AN_ARRAY, status: constants_1.STATUS_CODES.BAD_REQUEST };
};
exports.postBoardObjValidator = postBoardObjValidator;
const putBoardObjValidator = (obj) => {
    if (typeof obj !== 'object')
        throw { message: errors_1.ERRORS.NOT_AN_OBJECT, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (obj.hasOwnProperty('title') && typeof obj.title !== 'string')
        throw { message: errors_1.ERRORS.TITLE_NOT_A_STRING, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (obj.hasOwnProperty('columns') && !Array.isArray(obj.columns))
        throw { message: errors_1.ERRORS.COLUMNS_IS_NOT_AN_ARRAY, status: constants_1.STATUS_CODES.BAD_REQUEST };
};
exports.putBoardObjValidator = putBoardObjValidator;
//# sourceMappingURL=boardValidator.js.map