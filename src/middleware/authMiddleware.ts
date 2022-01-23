import { IncomingMessage, ServerResponse } from 'http';
import jwt from 'jsonwebtoken';
import process from 'process';
import { STATUS_CODES } from '../constants/constants';
import { sendResponse } from '../helpers/response';


export function authMiddleware (req:IncomingMessage, res:ServerResponse, time: number) {
    try {


        }catch (e) {
            console.log('error e:', e);
            res.end(JSON.stringify(e));
    }
}