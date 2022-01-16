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
export const tasksController = async (req: IncomingMessage, res: ServerResponse, time: number): Promise<void> =>{ 
    const url = req.url as string;
    try {
        if(req.method === REQUEST_METHODS.GET && url.endsWith('/tasks')){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
            return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);
            }
            const getResult = await getAllTasks(boardId);
            return sendResponse(req, res, STATUS_CODES.OK, time, getResult);
        }
        
        if(req.method === REQUEST_METHODS.GET && taskIdUrlValidator.test(url)){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }
            const taskId:string = url.split('/')[4];
            if(!uuidValidator.test(taskId)){
            return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }
            const task = await getTaskById(taskId);
            return sendResponse(req, res, STATUS_CODES.OK, time, task);
        }

        if(req.method === REQUEST_METHODS.POST && url.endsWith('/tasks')){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }
           const data = await requestDataExtractor(req);
           let taskObj: ITask;
           try {
                taskObj = JSON.parse(data);
           } catch(e) {
            return sendResponse(req, res, STATUS_CODES.SERVER_ERROR, time, ERRORS.JSON_PARSE_ERR);
           }
            postTaskObjValidator(taskObj);
            const task = await createTask(taskObj, boardId)
            return sendResponse(req, res, STATUS_CODES.CREATED, time, task)
        }

        if(req.method === REQUEST_METHODS.PUT && taskIdUrlValidator.test(url)) {
            const boardId: string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }

            const taskId: string = url.split('/')[4];
            if(!uuidValidator.test(taskId)) {
                return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }

            const data = await requestDataExtractor(req);
            let taskObj: ITaskUpdate;
            try {
                taskObj = JSON.parse(data);
            } catch(e) {
                return sendResponse(req, res, STATUS_CODES.SERVER_ERROR, time, ERRORS.JSON_PARSE_ERR);
            }
            
            putTaskObjValidator(taskObj);
            const task = await updateTask(taskObj, taskId);
            return sendResponse(req, res, STATUS_CODES.OK, time, task);
        }

        if(req.method === REQUEST_METHODS.DELETE && taskIdUrlValidator.test(url)){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }
            const taskId:string = url.split('/')[4];
            if(!uuidValidator.test(taskId)){
            return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }
            const deletionResult = await deleteTask(boardId, taskId);
            if(typeof deletionResult === 'string'){
                return sendResponse(req, res, STATUS_CODES.NOT_FOUND, time, deletionResult);
            }
            return sendResponse(req, res, deletionResult, time);
        }
    } catch (e) {
        const tranformedE = e as IError;
        const status = tranformedE.status ? tranformedE.status : STATUS_CODES.SERVER_ERROR;
        sendResponse(req, res, status, time, tranformedE);
    }
}