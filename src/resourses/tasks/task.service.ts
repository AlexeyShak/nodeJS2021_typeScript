const {v4: uuidv4} = require('uuid');
import {get, set} from './tasks.memory.repository'

import { ERRORS } from '../../constants/errors';
import  {STATUS_CODES} from '../../constants/constants';
import {tasks} from './tasks.memory.repository';
import { getBoardById } from '../boards/board.service';
import { ITask, ITaskCreate, ITaskUpdate } from '../../interfaces/tasks';
import { tasksController } from './tasks.router';

export const  unassignUserAfterDelete = (userId: string) =>{
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].userId === userId){
            tasks[i].userId  = null;
        }
    }
}

export const getAllTasks = (boardId:string) => {
    getBoardById(boardId);
    const tasksFromBoard = tasks.filter(el => el.boardId === boardId);
    return tasksFromBoard;
}

export const getTaskById = (boardId:string, taskId:string) =>{
    const boardWithTasks = getBoardById(boardId);
    const result = tasks.find(el => el.id === taskId);
    if(!result) throw {message: ERRORS.TASK_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    if(boardWithTasks.id !== result.boardId) throw {message: ERRORS.TASK_FROM_ANOTHER_BOARD, status: STATUS_CODES.BAD_REQUEST};
    return result
}
export const createTask = (taskData:ITaskCreate, boardId: string) =>{
    getBoardById(boardId);
    taskData.id = uuidv4();
    tasks.push(taskData);
    return taskData;
}

export const updateTask = (newTaskData: ITaskUpdate, boardId: string, taskId: string) =>{
    getBoardById(boardId);
    const result = tasks.findIndex(el => el.id === taskId);
    if(result === -1) throw {message: ERRORS.TASK_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    tasks[result].title = newTaskData.title || tasks[result].title;
    tasks[result].order = newTaskData.order || tasks[result].order;
    tasks[result].description = newTaskData.description || tasks[result].description;
    tasks[result].userId = newTaskData.userId || tasks[result].userId;
    tasks[result].columnId = newTaskData.columnId || tasks[result].columnId;
    tasks[result].boardId = newTaskData.boardId || tasks[result].boardId;
    return tasks[result];
}
export const deleteTask = (boardId: string, taskId:string) => {
    const boardWithTasks = getBoardById(boardId);
    const result = tasks.filter(el => el.id !== taskId);
    if(result.length === tasks.length) throw{message: ERRORS.TASK_NOT_FOUND, status: STATUS_CODES.NOT_FOUND } 
    const taskTodelete = tasks.find(el => el.id === taskId);
    if(boardWithTasks.id !== taskTodelete.boardId) throw{message: ERRORS.TASK_FROM_ANOTHER_BOARD, status: STATUS_CODES.BAD_REQUEST }
    tasks = result;
    return STATUS_CODES.NO_CONTENT;

}

export const deleteByBoard= (boardId:string) => {
    tasks = tasks.filter(el=> el.boardId !== boardId)
}

