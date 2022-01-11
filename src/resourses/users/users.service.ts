import {v4 as uuidv4} from 'uuid';

import { STATUS_CODES } from "../../constants/constants";
import { ERRORS } from "../../constants/errors";
import { IUser, IUserCreate, IUserUpdate } from "../../interfaces/users";
import { User} from "./users.memory.repository";
import { unassignUserAfterDelete } from "../tasks/task.service";
import { usersController } from './users.router';

/**
 * Function which returns all users without property "password" to users router
 * @return all users instanse of IUser[] to users router
 */

export const getAllUsers = async (): Promise<IUser[]> => {
    const users = await User.find();
    console.log('users: ', users)
    return users;
}

// /**
//  * Function which returns user with requested ID to users router
//  * @param userId - part of request url instance of string
//  * @return user with requested ID instanse of IUser
//  */
// export const getUserById = (userId: string): IUser => {
//     const result = users.find(el => el.id === userId);
//     if(!result) throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
//     delete result.password;
//     return result;
// }

/**
 * Function which creates new user and returns it to users router
 * @param boardData - requested user data instance of IUser
 * @return user with ID instanse of IUser
 */
export const createUser = async (newUser: IUserCreate): Promise<IUser> =>{
    const user = new User();
    user.id =  uuidv4();
    user.name = newUser.name;
    user.login = newUser.login;
    user.password = newUser.password;

    await user.save();
    return user;
    
}

/**
 * Function which creates new user and returns it to users router
 * @param newBoardData - requested user data instance of IUserUpdate
 * @return updated user instanse of IUser
 */
export const updateUser = async (updatedUser: IUserUpdate, userId: string): Promise<IUser> =>{
    const result = await User.findOne({id: userId});
    if(!result) throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    result.name = updatedUser.name || result.name;
    result.login = updatedUser.login || result.login;
    result.password = updatedUser.password || result.password;
    await result.save();

    return result;
}
/**
 * Function which deletes user with requested ID
 * @param newBoardData - requested userId instance of string
 * @return status code 'no content' instanse of number to user service
 */

export const deleteUser = async (userId: string): Promise<number> => {
    const user = await User.findOne({id: userId});
    if(!user) {
        throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    }
   
    
    await User.remove(user);
    unassignUserAfterDelete(userId);
    return STATUS_CODES.NO_CONTENT; 
}
