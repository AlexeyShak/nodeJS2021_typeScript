import {v4 as uuidv4} from 'uuid';

import { STATUS_CODES } from "../../constants/constants";
import { ERRORS } from "../../constants/errors";
import { IUser, IUserUpdate } from "../../interfaces/users";
import { users, usersModify } from "./users.memory.repository";
import { unassignUserAfterDelete } from "../tasks/task.service";

/**
 * Function which returns all users without property "password" to users router
 * @return all users instanse of IUser[] to users router
 */

export const getAllUsers = (): IUser[] => users.map(el => {
     delete el.password;
     return el;
 })

/**
 * Function which returns user with requested ID to users router
 * @param userId - part of request url instance of string
 * @return user with requested ID instanse of IUser
 */
export const getUserById = (userId: string): IUser => {
    const result = users.find(el => el.id === userId);
    if(!result) throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    delete result.password;
    return result;
}

/**
 * Function which creates new user and returns it to users router
 * @param boardData - requested user data instance of IUser
 * @return user with ID instanse of IUser
 */
export const createUser = (newUser: IUser): IUser =>{
    newUser.id = uuidv4();
    users.push(newUser);
    delete newUser.password;
    return newUser;
}

/**
 * Function which creates new user and returns it to users router
 * @param newBoardData - requested user data instance of IUserUpdate
 * @return updated user instanse of IUser
 */
export const updateUser = (updatedUser: IUserUpdate, userId: string): IUser =>{
    const result: number = users.findIndex(el => el.id === userId);
    if(result === -1) throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    users[result].name = updatedUser.name || users[result].name;
    users[result].login = updatedUser.login || users[result].login;
    users[result].password = updatedUser.password || users[result].password;
    return users[result];
}
/**
 * Function which deletes user with requested ID
 * @param newBoardData - requested userId instance of string
 * @return status code 'no content' instanse of number to user service
 */
export const deleteUser = (userId: string): number => {
    const result = users.filter(el => el.id !== userId);
    if(result.length === users.length) {
        throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    }
   
    usersModify(result);
    unassignUserAfterDelete(userId);
    return STATUS_CODES.NO_CONTENT; 
}
