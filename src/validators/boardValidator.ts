import { STATUS_CODES } from '../constants/constants';
import  { ERRORS } from '../constants/errors';
import { IBoard, IBoardUpdate } from '../interfaces/boards';


export const postBoardObjValidator = (obj: IBoard): void => {
    if(typeof obj !== 'object') throw {message: ERRORS.NOT_AN_OBJECT, status: STATUS_CODES.BAD_REQUEST }; 
    if(!Object.prototype.hasOwnProperty.call(obj,'title')) throw {message: ERRORS.TITLE_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST };
    if(typeof obj.title !== 'string') throw {message: ERRORS.TITLE_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST };  
    if(!Object.prototype.hasOwnProperty.call(obj, 'columns')) throw {message: ERRORS.COLUMNS_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST };
    if(!Array.isArray(obj.columns)) throw {message: ERRORS.COLUMNS_IS_NOT_AN_ARRAY, status: STATUS_CODES.BAD_REQUEST };
}

export const putBoardObjValidator = (obj:IBoardUpdate): void => {
    if(typeof obj !== 'object') throw {message: ERRORS.NOT_AN_OBJECT, status: STATUS_CODES.BAD_REQUEST }; 
    if(Object.prototype.hasOwnProperty.call(obj, 'title') && typeof obj.title !== 'string')throw {message: ERRORS.TITLE_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST }
    if(Object.prototype.hasOwnProperty.call(obj, 'columns') && !Array.isArray(obj.columns)) throw {message: ERRORS.COLUMNS_IS_NOT_AN_ARRAY, status: STATUS_CODES.BAD_REQUEST };
 
};
