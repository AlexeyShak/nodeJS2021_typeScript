import { IncomingMessage, ServerResponse } from 'http';
import { REQUEST_METHODS, STATUS_CODES} from '../../constants/constants';
import  { ERRORS } from '../../constants/errors';

import  {sendResponse} from '../../helpers/response';
import {createTask, deleteTask, getAllTasks, getTaskById, updateTask} from './task.service'

import {requestDataExtractor} from '../../helpers/request';
import { ITask, ITaskUpdate } from '../../interfaces/tasks';
import { postTaskObjValidator, putTaskObjValidator } from '../../validators/taskValidator';
import { IError } from '../../interfaces/errors';

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const taskIdUrlValidator = /\/boards\/.+\/tasks\/.+/;

/**
 * Module to controll operations with tasks
 * @param req - request from user
 * @param reply - reply to user
 * @return promise with void
 */
export const tasksController = async (req: IncomingMessage, res: ServerResponse): Promise<void> =>{ 
    const url = req.url as string;
    try {
        if(req.method === REQUEST_METHODS.GET && url.endsWith('/tasks')){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
            return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);
            }
            const getResult = getAllTasks(boardId);
            return sendResponse(res, STATUS_CODES.OK, getResult);
        }
        
        if(req.method === REQUEST_METHODS.GET && taskIdUrlValidator.test(url)){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const taskId:string = url.split('/')[4];
            if(!uuidValidator.test(taskId)){
            return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const task = getTaskById(boardId, taskId);
            return sendResponse(res, STATUS_CODES.OK, task);
        }

        if(req.method === REQUEST_METHODS.POST && url.endsWith('/tasks')){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
           const data = await requestDataExtractor(req);
           let taskObj: ITask;
           try {
                taskObj = JSON.parse(data);
           } catch(e) {
            return sendResponse(res, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
           }
            postTaskObjValidator(taskObj);
            const task = createTask(taskObj, boardId)
            return sendResponse(res, STATUS_CODES.CREATED, task)
        }

        if(req.method === REQUEST_METHODS.PUT && taskIdUrlValidator.test(url)) {
            const boardId: string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }

            const taskId: string = url.split('/')[4];
            if(!uuidValidator.test(taskId)) {
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }

            const data = await requestDataExtractor(req);
            let taskObj: ITaskUpdate;
            try {
                taskObj = JSON.parse(data);
            } catch(e) {
                return sendResponse(res, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
            }
            
            putTaskObjValidator(taskObj);
            const task = updateTask(taskObj, boardId, taskId);
            return sendResponse(res, STATUS_CODES.OK, task);
        }

        if(req.method === REQUEST_METHODS.DELETE && taskIdUrlValidator.test(url)){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const taskId:string = url.split('/')[4];
            if(!uuidValidator.test(taskId)){
            return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const deletionResult = deleteTask(boardId, taskId);
            if(typeof deletionResult === 'string'){
                return sendResponse(res, STATUS_CODES.NOT_FOUND, deletionResult);
            }
            return sendResponse(res, deletionResult);
        }
    } catch (e) {
        const tranformedE = e as IError;
        const status = tranformedE.status ? tranformedE.status : STATUS_CODES.SERVER_ERROR;
        sendResponse(res, status, tranformedE);
    }
}