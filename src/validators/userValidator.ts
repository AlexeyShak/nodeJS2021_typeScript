import { STATUS_CODES } from "../constants/constants";
import { IUserCreate, IUserUpdate } from "../interfaces/users";
import { ERRORS } from "../constants/errors";

export const postObjValidator = (obj: IUserCreate): void => {

    if(typeof obj !== 'object') throw {message: ERRORS.NOT_AN_OBJECT, status: STATUS_CODES.BAD_REQUEST};

    if(!Object.prototype.hasOwnProperty.call(obj, 'name')) throw {message:  ERRORS.NAME_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST};

    if(typeof obj.name !== 'string') throw {message: ERRORS.NAME_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST};

    if(!Object.prototype.hasOwnProperty.call(obj, 'login')) throw {message:  ERRORS.LOGIN_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST};

    if(typeof obj.login !== 'string') throw {message:  ERRORS.LOGIN_IS_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST};

    if(!Object.prototype.hasOwnProperty.call(obj, 'password')) throw {message:  ERRORS.PASSWORD_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST};

    if(typeof obj.password !== 'string') throw {message:  ERRORS.PASSWORD_NOT_STRING, status: STATUS_CODES.BAD_REQUEST};

};


export const putObjValidator = (obj: IUserUpdate): string => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    if(Object.prototype.hasOwnProperty.call(obj, 'name') && typeof obj.name !== 'string'){
        return ERRORS.NAME_NOT_A_STRING;
    }
    if(Object.prototype.hasOwnProperty.call(obj, 'login') && typeof obj.login !== 'string'){
        return  ERRORS.LOGIN_IS_NOT_A_STRING;
    }
    if(Object.prototype.hasOwnProperty.call(obj, 'password') && typeof obj.password !== 'string'){
        return ERRORS.PASSWORD_NOT_STRING;
    }

};