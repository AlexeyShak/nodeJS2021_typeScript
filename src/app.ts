import { createServer, IncomingMessage, ServerResponse} from 'http';
import 'reflect-metadata';
import dotenv from 'dotenv';
import process from 'process';



import { boardsController } from './resourses/boards/board.router';
import { tasksController } from './resourses/tasks/tasks.router';
import { usersController } from './resourses/users/users.router';
import { loggerUncaught, loggerUnhandled, logLogger } from './helpers/logger';
import { LOG_LEVELS, STATUS_CODES } from './constants/constants';
import { loginController } from './resourses/login/login.router';
import { authMiddleware } from './middleware/auth.middleware';
import { IError } from './interfaces/errors'






dotenv.config();


/**
 * Creates server
 * @param req - request from user
 * @param reply - reply to user
 * @return  error or requested data
 */

logLogger(LOG_LEVELS.INFO, `port: ${process.env.PORT}`);
export const app = createServer(async (request: IncomingMessage, response: ServerResponse) => {
    process.on('uncaughtException', (err, origin) =>{
        loggerUncaught(err, origin);
        response.writeHead(500, {
            'Content-Type': 'application/json'
        })
        response.end();
    });
    process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) =>{
        loggerUnhandled(reason, promise);
        response.writeHead(500, {
            'Content-Type': 'application/json'
        })
        response.end();
    });
    try{
        const url = request.url as string;
        const time = new Date().getTime();
        if(url === '/login'){
            return loginController(request, response, time);
        }
        await authMiddleware(request, response);
        if(url.startsWith('/users')){
            return usersController(request, response, time);
        }
        if(url.startsWith('/boards')){
            if(url.includes('/tasks')){
              return tasksController(request,response, time);
            }
          return boardsController(request, response, time);
        }
    }catch (e: unknown){
        console.log('error e:', e);
        const transformedE = e as IError;
        const status = transformedE?.status ? transformedE.status : STATUS_CODES.SERVER_ERROR;
        response.writeHead(status);
        return response.end(JSON.stringify(e));
    }
    response.end('petrucchoe');
})


