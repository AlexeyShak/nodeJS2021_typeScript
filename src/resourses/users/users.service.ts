import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcryptjs';


import { STATUS_CODES } from "../../constants/constants";
import { ERRORS } from "../../constants/errors";
import { IUserCreate, IUserUpdate } from "../../interfaces/users";
import { User } from "./users.memory.repository";


/**
 * Function which returns all users without property "password" to users router
 * @return all users instanse of IUser[] to users router
 */

export const getAllUsers = async ():Promise<User[]> => {

    const users = await User.find();
    return users.map(user => user.toResponse() as User)
    
}

// /**
//  * Function which returns user with requested ID to users router
//  * @param userId - part of request url instance of string
//  * @return user with requested ID instanse of IUser
//  */
export const getUserById = async (userId: string) => {
    const user = await User.findOne({id: userId});
    if(!user) throw { message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND}
    return user.toResponse();
}

/**
 * Function which creates new user and returns it to users router
 * @param boardData - requested user data instance of IUser
 * @return user with ID instanse of IUser
 */
export const createUser = async (newUser: IUserCreate) =>{
    const hashPassword = bcrypt.hashSync(newUser.password, 3);
    const user = new User();
    user.id =  uuidv4();
    user.name = newUser.name;
    user.login = newUser.login;
    user.password = hashPassword;
    await user.save();
    return user;
}

/**
 * Function which creates new user and returns it to users router
 * @param newBoardData - requested user data instance of IUserUpdate
 * @return updated user instanse of IUser
 */
export const updateUser = async (updatedUser: IUserUpdate, userId: string) => {
    const result = await User.findOne({id: userId});
    if(!result) throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    result.name = updatedUser.name || result.name;
    result.login = updatedUser.login || result.login;
    result.password = updatedUser.password || result.password;
    await result.save();

    return result.toResponse();
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
    return STATUS_CODES.NO_CONTENT; 
}

