import { ERRORS } from '../../constants/errors';
import  {STATUS_CODES} from '../../constants/constants';
import {tasks, taskModify} from './tasks.memory.repository';
import { getBoardById } from '../boards/board.service';
import { ITask, ITaskUpdate } from '../../interfaces/tasks';

import {v4 as uuidv4} from 'uuid';

/**
 * Function which unassign user with requested ID by changin task prop "userId" to null
 * @param userId - part of request url instance of string
 * @return void
 */
export const  unassignUserAfterDelete = (userId: string):void =>{
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].userId === userId){
            tasks[i].userId  = null;
        }
    }
}
/**
 * Function which returns all tasks with requested boardId to tasks router
 * @param boardId - part of request url instance of string
 * @return all tasks instanse of ITask[] to tasks router
 */
export const getAllTasks = (boardId: string): ITask[] => {
    getBoardById(boardId);
    const tasksFromBoard = tasks.filter(el => el.boardId === boardId);
    return tasksFromBoard;
}
/**
 * Function which returns task with requested ID to task router
 * @param taskId - part of request url instance of string
 * @param boardId - part of request url instance of string
 * @return task with requested ID instanse of Itask
 */
export const getTaskById = (boardId: string, taskId: string): ITask =>{
    const boardWithTasks = getBoardById(boardId);
    const result = tasks.find(el => el.id === taskId);
    if(!result) throw {message: ERRORS.TASK_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    if(boardWithTasks.id !== result.boardId) throw {message: ERRORS.TASK_FROM_ANOTHER_BOARD, status: STATUS_CODES.BAD_REQUEST};
    return result
}

/**
 * Function which creates new task with requested boardID and returns it to users router
 * @param taskData - requested task data instance of ITask
 * @param boardId - part of request url instance of string
 * @return task with ID instanse of ITask
 */
export const createTask = (taskData: ITask, boardId: string): ITask =>{
    getBoardById(boardId);
    taskData.id = uuidv4();
    taskData.boardId = boardId;
    tasks.push(taskData);
    return taskData;
}
/**
 * Function which updates new task with requested boardID and returns it to users router
 * @param taskData - requested task data instance of ITaskUpdate
 * @param boardId - part of request url instance of string
 * @return task with ID instanse of Itask
 */
export const updateTask = (newTaskData: ITaskUpdate, boardId: string, taskId: string): ITask =>{
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

/**
 * Function which deletes task with requested ID from board with requested ID
 * @param newBoardData - requested userId instance of string
 * @param boardId - part of request url instance of string
 * @return status code 'no content' instanse of number to task service
 */
export const deleteTask = (boardId: string, taskId: string): number => {
    const boardWithTasks = getBoardById(boardId);
    const result = tasks.filter(el => el.id !== taskId);
    if(result.length === tasks.length) throw{message: ERRORS.TASK_NOT_FOUND, status: STATUS_CODES.NOT_FOUND } 
    const taskToDelete = tasks.find(el => el.id === taskId);
    if(boardWithTasks.id !== taskToDelete?.boardId) throw{message: ERRORS.TASK_FROM_ANOTHER_BOARD, status: STATUS_CODES.BAD_REQUEST };
    taskModify(result);
    return STATUS_CODES.NO_CONTENT;
}

