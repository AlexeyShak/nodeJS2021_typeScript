import { Request, Response } from 'express';
import { REQUEST_METHODS, STATUS_CODES} from '../../constants/constants';
import  { ERRORS } from '../../constants/errors';

import  {sendResponse} from '../../helpers/response';
import {createTask, deleteTask, getAllTasks, getTaskById, updateTask} from './task.service'

import {requestDataExtractor} from '../../helpers/request';
import { ITask, ITaskUpdate } from '../../interfaces/tasks';
import { postTaskObjValidator, putTaskObjValidator } from '../../validators/taskValidator';

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const taskIdUrlValidator = /\/boards\/.+\/tasks\/.+/;

export const tasksController = async (req: Request, res: Response): Promise<void> =>{ 
    try {
        if(req.method === REQUEST_METHODS.GET && req.url.endsWith('/tasks')){
            const boardId:string = req.url.split('/')[2];
            if(!uuidValidator.test(boardId)){
            return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);
            }
            const getResult = getAllTasks(boardId);
            return sendResponse(res, STATUS_CODES.OK, getResult);
        }
        
        if(req.method === REQUEST_METHODS.GET && taskIdUrlValidator.test(req.url)){
            const boardId:string = req.url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const taskId:string = req.url.split('/')[4];
            if(!uuidValidator.test(taskId)){
            return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const task = getTaskById(boardId, taskId);
            return sendResponse(res, STATUS_CODES.OK, task);
        }

        if(req.method === REQUEST_METHODS.POST && req.url.endsWith('/tasks')){
            const boardId:string = req.url.split('/')[2];
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

        if(req.method === REQUEST_METHODS.PUT && taskIdUrlValidator.test(req.url)) {
            const boardId: string = req.url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }

            const taskId: string = req.url.split('/')[4];
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

        if(req.method === REQUEST_METHODS.DELETE && taskIdUrlValidator.test(req.url)){
            const boardId:string = req.url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const taskId:string = req.url.split('/')[4];
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
        const status = e.status ? e.status : STATUS_CODES.SERVER_ERROR;
        sendResponse(res, status, e);
    }
}