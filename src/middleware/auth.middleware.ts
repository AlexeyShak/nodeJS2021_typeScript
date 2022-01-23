import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";

import { STATUS_CODES } from "../constants/constants";
import { ERRORS } from "../constants/errors";
import { IPayLoad } from "../interfaces/users";
import { getUserById } from "../resourses/users/users.service";

export const authMiddleware = async (req:IncomingMessage, res:ServerResponse):Promise<void> => {
    const token = req.headers.authorization;
    if(!token){
        throw {message: ERRORS.NOT_AUTHORIZED, status: STATUS_CODES.UNAUTHORIZED}
    }
    if(token.split(' ').length !== 2 || token.split(' ')[0] !== "Bearer"){
        throw {message: ERRORS.NOT_AUTHORIZED, status: STATUS_CODES.UNAUTHORIZED};
    }
    const rawToken = token.split(' ')[1];
    return jwt.verify(rawToken, process.env.JWT_SECRET_KEY as string, async (err, decoded) => {
        if(err){
            throw {message: ERRORS.NOT_AUTHORIZED, status: STATUS_CODES.UNAUTHORIZED};
        }
        const transformedDecoded = decoded as IPayLoad;
        if(!transformedDecoded?.userId){
            throw {message: ERRORS.NOT_AUTHORIZED, status: STATUS_CODES.UNAUTHORIZED};
        }
        const user = await getUserById(transformedDecoded.userId);
        if(!user){
            throw {message: ERRORS.NOT_AUTHORIZED, status: STATUS_CODES.UNAUTHORIZED};
        }
    })
}