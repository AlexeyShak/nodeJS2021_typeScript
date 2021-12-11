
import { STATUS_CODES } from '../constants/constants';
import { ERRORS } from '../constants/errors';
import { ITask, ITaskUpdate } from '../interfaces/tasks';

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;

export const postTaskObjValidator = (obj: ITask): void => {
    if(typeof obj !== 'object') throw {message: ERRORS.NOT_AN_OBJECT, status: STATUS_CODES.BAD_REQUEST} ;
    if(!Object.prototype.hasOwnProperty.call(obj, 'title')) throw {message: ERRORS.TITLE_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST} ;
    if(typeof obj.title !== 'string') throw {message: ERRORS.TITLE_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST} ;
    if(!Object.prototype.hasOwnProperty.call(obj, 'order')) throw {message: ERRORS.ORDER_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST} ;
    if(typeof obj.order !== 'number') throw {message: ERRORS.ORDER_IS_NOT_A_NUMBER, status: STATUS_CODES.BAD_REQUEST} ;
    if(!Object.prototype.hasOwnProperty.call(obj, 'description')) throw {message: ERRORS.DESCRIPTION_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST} ;
    if(typeof obj.description !== 'string') throw {message: ERRORS.DESCRIPTION_IS_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST} ;
    if(!Object.prototype.hasOwnProperty.call(obj, 'userId')) throw {message: ERRORS.USERID_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST};
    if((typeof obj.userId !== 'string' && obj.userId !== null)) throw {message: ERRORS.USERID_IS_NOT_A_STRING_OR_NULL, status: STATUS_CODES.BAD_REQUEST};
};

export const putTaskObjValidator = (obj: ITaskUpdate): void => {
    if(typeof obj !== 'object') throw {message: ERRORS.NOT_AN_OBJECT, status: STATUS_CODES.BAD_REQUEST};
    if(Object.prototype.hasOwnProperty.call(obj, 'title') && typeof obj.title !== 'string') throw {message: ERRORS.TITLE_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST};
    if(Object.prototype.hasOwnProperty.call(obj, 'order') && typeof obj.order !== 'number') throw {message: ERRORS.ORDER_IS_NOT_A_NUMBER, status: STATUS_CODES.BAD_REQUEST};
    if(Object.prototype.hasOwnProperty.call(obj, 'description') && typeof obj.description !== 'string') throw {message: ERRORS.DESCRIPTION_IS_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST};
    if(Object.prototype.hasOwnProperty.call(obj, 'userId') && !uuidValidator.test(obj.userId as string) && obj.userId !== null) throw {message: ERRORS.USERID_IS_NOT_A_STRING_OR_NULL, status: STATUS_CODES.BAD_REQUEST};
    if(Object.prototype.hasOwnProperty.call(obj, 'columnId') && !uuidValidator.test(obj.columnId as string) && obj.columnId !== null) throw {message: ERRORS.WRONG_ID_FORMAT, status: STATUS_CODES.BAD_REQUEST};
    if(Object.prototype.hasOwnProperty.call(obj, 'boardId') && !uuidValidator.test(obj.boardId as string)) throw {message: ERRORS.WRONG_ID_FORMAT, status: STATUS_CODES.BAD_REQUEST};
};
