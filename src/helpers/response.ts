
import { IncomingMessage, ServerResponse, STATUS_CODES } from 'http';
import { LOG_LEVELS, REQUEST_METHODS } from '../constants/constants';
import { IError } from '../interfaces/errors';
import { loggerErrors, loggerSuccess } from './logger';


/**
 * Module to form responses to User
 * @param res - resoponse to server
 * @param status - status code is responsed to User
 * @param data - data which is responsed to User
 * @return void
 */
export const sendResponse =  (req: IncomingMessage, res: ServerResponse, status: number, time: number, data?: string | object | IError):void => {
    res.writeHead(status, {
        'Content-Type': 'application/json'
      }
    )
    if(typeof data !== 'string' && !Object.prototype.hasOwnProperty.call(data, 'message')){
      loggerSuccess(LOG_LEVELS.INFO, req, status, time, data);
    }
    else {
      loggerErrors(LOG_LEVELS.ERROR, req, status, time, data);
    }
    res.end(data ? JSON.stringify(data): '');
}

