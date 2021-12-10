import { STATUS_CODES } from '../constants/constants';
import  { ERRORS } from '../constants/errors';
import { IBoardCreate, IBoardUpdate } from '../interfaces/boards';

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;

export const postBoardObjValidator = (obj:IBoardCreate) => {
    if(typeof obj !== 'object') throw {message: ERRORS.NOT_AN_OBJECT, status: STATUS_CODES.BAD_REQUEST }; 
    if(!obj.hasOwnProperty('title')) throw {message: ERRORS.TITLE_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST };
    if(typeof obj.title !== 'string') throw {message: ERRORS.TITLE_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST };  
    if(!obj.hasOwnProperty('columns')) throw {message: ERRORS.COLUMNS_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST };
    if(!Array.isArray(obj.columns)) throw {message: ERRORS.COLUMNS_IS_NOT_AN_ARRAY, status: STATUS_CODES.BAD_REQUEST };
}

export const putBoardObjValidator = (obj:IBoardUpdate) => {
    if(typeof obj !== 'object') throw {message: ERRORS.NOT_AN_OBJECT, status: STATUS_CODES.BAD_REQUEST }; 
    if(obj.hasOwnProperty('title') && typeof obj.title !== 'string')throw {message: ERRORS.TITLE_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST }
    if(obj.hasOwnProperty('columns') && !Array.isArray(obj.columns)) throw {message: ERRORS.COLUMNS_IS_NOT_AN_ARRAY, status: STATUS_CODES.BAD_REQUEST };
 
};
