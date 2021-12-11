import {v4 as uuidv4} from 'uuid';

import { STATUS_CODES } from "../../constants/constants";
import { ERRORS } from "../../constants/errors";
import { IUser, IUserUpdate } from "../../interfaces/users";
import { users, usersModify } from "./users.memory.repository";
import { unassignUserAfterDelete } from "../tasks/task.service";

export const getAllUsers = (): IUser[] => users.map(el => {
     delete el.password;
     return el;
 })

export const getUserById = (userId: string): IUser => {
    const result = users.find(el => el.id === userId);
    if(!result) throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    delete result.password;
    return result;
}

export const createUser = (newUser: IUser): IUser =>{
    newUser.id = uuidv4();
    users.push(newUser);
    delete newUser.password;
    return newUser;
}

export const updateUser = (updatedUser: IUserUpdate, userId: string): IUser =>{
    const result: number = users.findIndex(el => el.id === userId);
    if(result === -1) throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    users[result].name = updatedUser.name || users[result].name;
    users[result].login = updatedUser.login || users[result].login;
    users[result].password = updatedUser.password || users[result].password;
    return users[result];
}

export const deleteUser = (userId: string): number => {
    const result = users.filter(el => el.id !== userId);
    if(result.length === users.length) {
        throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    }
   
    usersModify(result);
    unassignUserAfterDelete(userId);
    return STATUS_CODES.NO_CONTENT; 
}
