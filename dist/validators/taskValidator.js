"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTaskObjValidator = exports.postTaskObjValidator = void 0;
const constants_1 = require("../constants/constants");
const errors_1 = require("../constants/errors");
const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const postTaskObjValidator = (obj) => {
    if (typeof obj !== 'object')
        throw { message: errors_1.ERRORS.NOT_AN_OBJECT, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!obj.hasOwnProperty('title'))
        throw { message: errors_1.ERRORS.TITLE_NOT_ENTERED, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (typeof obj.title !== 'string')
        throw { message: errors_1.ERRORS.TITLE_NOT_A_STRING, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!obj.hasOwnProperty('order'))
        throw { message: errors_1.ERRORS.ORDER_NOT_ENTERED, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (typeof obj.order !== 'number')
        throw { message: errors_1.ERRORS.ORDER_IS_NOT_A_NUMBER, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!obj.hasOwnProperty('description'))
        throw { message: errors_1.ERRORS.DESCRIPTION_NOT_ENTERED, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (typeof obj.description !== 'string')
        throw { message: errors_1.ERRORS.DESCRIPTION_IS_NOT_A_STRING, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (!obj.hasOwnProperty('userId'))
        throw { message: errors_1.ERRORS.USERID_NOT_ENTERED, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if ((typeof obj.userId !== 'string' && obj.userId !== null))
        throw { message: errors_1.ERRORS.USERID_IS_NOT_A_STRING_OR_NULL, status: constants_1.STATUS_CODES.BAD_REQUEST };
};
exports.postTaskObjValidator = postTaskObjValidator;
const putTaskObjValidator = (obj) => {
    if (typeof obj !== 'object')
        throw { message: errors_1.ERRORS.NOT_AN_OBJECT, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (obj.hasOwnProperty('title') && typeof obj.title !== 'string')
        throw { message: errors_1.ERRORS.TITLE_NOT_A_STRING, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (obj.hasOwnProperty('order') && typeof obj.order !== 'number')
        throw { message: errors_1.ERRORS.ORDER_IS_NOT_A_NUMBER, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (obj.hasOwnProperty('description') && typeof obj.description !== 'string')
        throw { message: errors_1.ERRORS.DESCRIPTION_IS_NOT_A_STRING, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (obj.hasOwnProperty('userId') && !uuidValidator.test(obj.userId) && obj.userId !== null)
        throw { message: errors_1.ERRORS.USERID_IS_NOT_A_STRING_OR_NULL, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (obj.hasOwnProperty('columnId') && !uuidValidator.test(obj.columnId))
        throw { message: errors_1.ERRORS.WRONG_ID_FORMAT, status: constants_1.STATUS_CODES.BAD_REQUEST };
    if (obj.hasOwnProperty('boardId') && !uuidValidator.test(obj.boardId))
        throw { message: errors_1.ERRORS.WRONG_ID_FORMAT, status: constants_1.STATUS_CODES.BAD_REQUEST };
};
exports.putTaskObjValidator = putTaskObjValidator;
//# sourceMappingURL=taskValidator.js.map