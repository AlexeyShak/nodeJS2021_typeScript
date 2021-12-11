import { IncomingMessage, ServerResponse } from 'http';
import { REQUEST_METHODS, STATUS_CODES } from "../../constants/constants";
import { ERRORS } from "../../constants/errors";
import { requestDataExtractor } from "../../helpers/request";
import { sendResponse } from "../../helpers/response";
import { IUserCreate, IUserUpdate } from "../../interfaces/users";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "./users.service";
import {postObjValidator, putObjValidator} from "../../validators/userValidator"
import { IError } from '../../interfaces/errors';


const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/users\/.+/; 

export const usersController = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const url = req.url as string;
    try {
        if(req.method === REQUEST_METHODS.GET && req.url === '/users' ){
            return sendResponse(res, STATUS_CODES.OK, getAllUsers());
        }
        if(req.method === REQUEST_METHODS.GET && urlValidator.test(url)){
            const userId: string = url.split('/')[2];
            if(!uuidValidator.test(userId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            
            const user = getUserById(userId);
            return sendResponse(res, STATUS_CODES.OK, user);
        }
        if(req.method === REQUEST_METHODS.POST && req.url === '/users'){
           const data = await requestDataExtractor(req);
           let dataObj: IUserCreate;
           try {
                dataObj = JSON.parse(data);
           } catch(e) {
            return sendResponse(res, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
           }
               postObjValidator(dataObj);
               const user = createUser(dataObj)
               return sendResponse(res, STATUS_CODES.CREATED, user)
        }
        if(req.method === REQUEST_METHODS.PUT && urlValidator.test(url)){
            const userId: string = url.split('/')[2];
            if(!uuidValidator.test(userId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const data = await requestDataExtractor(req);
            let dataObj: IUserUpdate;
            try {
                dataObj = JSON.parse(data);
            } catch(e) {
            return sendResponse(res, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
            }
               putObjValidator(dataObj);
               const user = updateUser(dataObj, userId);
               return sendResponse(res, STATUS_CODES.OK, user);
        }
        if(req.method === REQUEST_METHODS.DELETE && urlValidator.test(url)){
            const userId: string = url.split('/')[2];
            if(!uuidValidator.test(userId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);
            }
            const deletionResult = deleteUser(userId);
            if(typeof deletionResult === 'string'){
                return sendResponse(res, STATUS_CODES.NOT_FOUND, deletionResult);
            }
            return sendResponse(res, deletionResult);
        }
    } catch (e: unknown) {
        const transformedE = e as IError;
        const status = transformedE.status ? transformedE.status : STATUS_CODES.SERVER_ERROR;
        sendResponse(res, status, transformedE);
    }

   
}