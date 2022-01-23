import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';

import { STATUS_CODES } from '../../constants/constants';
import { ERRORS } from '../../constants/errors';
import { IUserLogin } from '../../interfaces/users';
import { User } from '../users/users.memory.repository';

export const createAdmin = async () => {
    const admin = await User.findOne({login: 'admin'});
    if(!admin){
        const hashPassword = bcrypt.hashSync('admin', 3)
        const admin = new User();
        admin.id = uuidv4();
        admin.name = 'ADMIN';
        admin.login = 'admin';
        admin.password = hashPassword;
        await admin.save();
    }
}

const generateAccessToken = (userId:string, login:string): string =>{
    const payLoad = { 
        userId,
        login
    }
    return jwt.sign(payLoad, process.env.JWT_SECRET_KEY as string, { expiresIn: '24h'})
}

export const createToken = async (newLogin: IUserLogin)=>{
    const user = await User.findOne({login: newLogin.login});
    if(!user) throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.FORBIDDEN};
    console.log('password:', newLogin.password);
    const validPassword = bcrypt.compareSync(newLogin.password, user.password);
    if(!validPassword) throw {message:  ERRORS.WRONG_PASSWORD, status: STATUS_CODES.BAD_REQUEST};
    const token = generateAccessToken(user.id, user.login);
    return token;
}