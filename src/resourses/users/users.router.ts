import { IncomingMessage, ServerResponse } from 'http';
import { REQUEST_METHODS, STATUS_CODES } from "../../constants/constants";
import { ERRORS } from "../../constants/errors";
import { requestDataExtractor } from "../../helpers/request";
import { sendResponse } from "../../helpers/response";
import { IUserCreate, IUserUpdate } from "../../interfaces/users";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "./users.service";
import {postObjValidator, putObjValidator} from "../../validators/userValidator"
import { IError } from '../../interfaces/errors';
import { setBoards } from '../boards/board.memory.repository';


const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/users\/.+/; 

/**
 * Module to controll operations with users
 * @param req - request from user
 * @param reply - reply to user
 * @return promise with void
 */
export const usersController = async (req: IncomingMessage, res: ServerResponse, time: number): Promise<void> => {
    const url = req.url as string;
    const reqData = req;
    try {
        if(req.method === REQUEST_METHODS.GET && req.url === '/users' ){
            return sendResponse(reqData, res, STATUS_CODES.OK, time, getAllUsers());
        }
        if(req.method === REQUEST_METHODS.GET && urlValidator.test(url)){
            const userId: string = url.split('/')[2];
            if(!uuidValidator.test(userId)){
                return sendResponse(reqData, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }
            
            const user = getUserById(userId);
            return sendResponse(reqData, res, STATUS_CODES.OK, time, user);
        }
        if(req.method === REQUEST_METHODS.POST && req.url === '/users'){
           const data = await requestDataExtractor(req);
           let dataObj: IUserCreate;
           try {
                dataObj = JSON.parse(data);
           } catch(e) {
            return sendResponse(reqData, res, STATUS_CODES.SERVER_ERROR, time, ERRORS.JSON_PARSE_ERR);
           }
            postObjValidator(dataObj);
            const user = createUser(dataObj)
            return sendResponse(reqData, res, STATUS_CODES.CREATED, time, user)
        }
        if(req.method === REQUEST_METHODS.PUT && urlValidator.test(url)){
            const userId: string = url.split('/')[2];
            if(!uuidValidator.test(userId)){
                return sendResponse(reqData, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }
            const data = await requestDataExtractor(req);
            let dataObj: IUserUpdate;
            try {
                dataObj = JSON.parse(data);
            } catch(e) {
            return sendResponse(reqData, res, STATUS_CODES.SERVER_ERROR, time, ERRORS.JSON_PARSE_ERR);
            }
               putObjValidator(dataObj);
               const user = updateUser(dataObj, userId);
               return sendResponse(reqData, res, STATUS_CODES.OK, time, user);
        }
        if(req.method === REQUEST_METHODS.DELETE && urlValidator.test(url)){
            const userId: string = url.split('/')[2];
            if(!uuidValidator.test(userId)){
                return sendResponse(reqData, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);
            }
            const deletionResult = deleteUser(userId);
            if(typeof deletionResult === 'string'){
                return sendResponse(reqData, res, STATUS_CODES.NOT_FOUND, time, deletionResult);
            }
            return sendResponse(reqData, res, deletionResult, time);
        }
        return sendResponse(reqData, res, STATUS_CODES.NOT_FOUND, time,  ERRORS.WROND_URL_FORMAT);
    } catch (e: unknown) {
        const transformedE = e as IError;
        const status = transformedE.status ? transformedE.status : STATUS_CODES.SERVER_ERROR;
        sendResponse(reqData, res, status, time, transformedE);
    }

   
}