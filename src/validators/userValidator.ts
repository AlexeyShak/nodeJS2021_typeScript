import { STATUS_CODES } from "../constants/constants";
import { IUserCreate, IUserLogin, IUserUpdate } from "../interfaces/users";
import { ERRORS } from "../constants/errors";
/**
 * Method to validate created user
 * @param obj instance of IUserCreate
 * @returns void
 */
export const postObjValidator = (obj: IUserCreate): void => {

    if(typeof obj !== 'object') throw {message: ERRORS.NOT_AN_OBJECT, status: STATUS_CODES.BAD_REQUEST};

    if(!Object.prototype.hasOwnProperty.call(obj, 'name')) throw {message:  ERRORS.NAME_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST};

    if(typeof obj.name !== 'string') throw {message: ERRORS.NAME_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST};

    if(!Object.prototype.hasOwnProperty.call(obj, 'login')) throw {message:  ERRORS.LOGIN_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST};

    if(typeof obj.login !== 'string') throw {message:  ERRORS.LOGIN_IS_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST};

    if(!Object.prototype.hasOwnProperty.call(obj, 'password')) throw {message:  ERRORS.PASSWORD_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST};

    if(typeof obj.password !== 'string') throw {message:  ERRORS.PASSWORD_NOT_STRING, status: STATUS_CODES.BAD_REQUEST};

};

/**
 * Method to validate updated user
 * @param obj instance of IUserUpdate
 * @returns void
 */
export const putObjValidator = (obj: IUserUpdate): void => {
    if(typeof obj !== 'object'){
        throw ERRORS.NOT_AN_OBJECT;
    }
    if(Object.prototype.hasOwnProperty.call(obj, 'name') && typeof obj.name !== 'string'){
        throw ERRORS.NAME_NOT_A_STRING;
    }
    if(Object.prototype.hasOwnProperty.call(obj, 'login') && typeof obj.login !== 'string'){
        throw  ERRORS.LOGIN_IS_NOT_A_STRING;
    }
    if(Object.prototype.hasOwnProperty.call(obj, 'password') && typeof obj.password !== 'string'){
        throw ERRORS.PASSWORD_NOT_STRING;
    }

};

export const postLoginObjValodator = (obj:IUserLogin): void => {
    if(typeof obj !== 'object') throw {message: ERRORS.NOT_AN_OBJECT, status: STATUS_CODES.BAD_REQUEST};
    
    if(!Object.prototype.hasOwnProperty.call(obj, 'login')) throw {message:  ERRORS.LOGIN_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST};

    if(typeof obj.login !== 'string') throw {message:  ERRORS.LOGIN_IS_NOT_A_STRING, status: STATUS_CODES.BAD_REQUEST};

    if(!Object.prototype.hasOwnProperty.call(obj, 'password')) throw {message:  ERRORS.PASSWORD_NOT_ENTERED, status: STATUS_CODES.BAD_REQUEST};

    if(typeof obj.password !== 'string') throw {message:  ERRORS.PASSWORD_NOT_STRING, status: STATUS_CODES.BAD_REQUEST};
}