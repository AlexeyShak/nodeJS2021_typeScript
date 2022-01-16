import { ERRORS } from '../../constants/errors';
import  {STATUS_CODES} from '../../constants/constants';
import {Task} from './tasks.memory.repository';
import { getBoardById } from '../boards/board.service';
import { ITask, ITaskUpdate } from '../../interfaces/tasks';

import {v4 as uuidv4} from 'uuid';


import { User } from '../users/users.memory.repository';
import { Board } from '../boards/board.memory.repository';
import { ColumnEntity } from '../columns/columns'
import { getUserById } from '../users/users.service';

/**
 * Function which returns all tasks with requested boardId to tasks router
 * @param boardId - part of request url instance of string
 * @return all tasks instanse of ITask[] to tasks router
 */
export const getAllTasks = async (boardId: string) => {
    const allTasks = await Task.find({boardId: boardId});
    return allTasks.map(task => task.toResponse());
}
/**
 * Function which returns task with requested ID to task router
 * @param taskId - part of request url instance of string
 * @param boardId - part of request url instance of string
 * @return task with requested ID instanse of Itask
 */
export const getTaskById = async (boardId: string, taskId: string) => { 
    const task = await Task.findOne({id: taskId});
    if(!task) throw { message: ERRORS.TASK_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    return task.toResponse();
}

/**
 * Function which creates new task with requested boardID and returns it to users router
 * @param taskData - requested task data instance of ITask
 * @param boardId - part of request url instance of string
 * @return task with ID instanse of ITask
 */
export const createTask = async (taskData: ITask, boardId: string) =>{
    const task = new Task();
    task.title = taskData.title;
    task.order = taskData.order;
    task.description = taskData.description;

    if(!!taskData.userId){
        task.user = await getUserById(taskData.userId) as User;
    }
    if(!!taskData.boardId){
        task.board = await getBoardById(taskData.boardId) as Board;
    }
    if(!!taskData.columnId){
        async function getColumnById(id: string) {
            const column = await ColumnEntity.findOne({id: id})
            return column;
        }

        task.column = await getColumnById(taskData.columnId) as ColumnEntity
    }
    await task.save();
    return task.toResponse()
}
/**
 * Function which updates new task with requested boardID and returns it to users router
 * @param taskData - requested task data instance of ITaskUpdate
 * @param boardId - part of request url instance of string
 * @return task with ID instanse of Itask
 */
export const updateTask = async (newTaskData: ITaskUpdate, boardId: string, taskId: string) => {
    const task = await Task.findOne({id: taskId});
    if(!task) throw { message: ERRORS.TASK_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    task.title = newTaskData.title || task.title;
    task.order = newTaskData.order || task.order;
    task.description = newTaskData.description || task.description;

    if(!!newTaskData.userId){
        task.user = await getUserById(newTaskData.userId) as User;
    }
    if(!!newTaskData.boardId){
        task.board = await getBoardById(newTaskData.boardId) as Board;
    }
    if(!!newTaskData.columnId){
        async function getColumnById(id: string) {
            const column = await ColumnEntity.findOne({id: id})
            return column;
        }

        task.column = await getColumnById(newTaskData.columnId) as ColumnEntity
    }
    await task.save();
    return task.toResponse();

}

/**
 * Function which deletes task with requested ID from board with requested ID
 * @param newBoardData - requested userId instance of string
 * @param boardId - part of request url instance of string
 * @return status code 'no content' instanse of number to task service
 */
export const deleteTask = async (boardId: string, taskId: string): Promise<number> => {
    const task = await Task.findOne({id: taskId});
    if(!task) {
        throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    }
   
    await Task.remove(task);
    return STATUS_CODES.NO_CONTENT;
}

