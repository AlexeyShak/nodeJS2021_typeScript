import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';

import { boardsController } from './resourses/boards/board.router';
import { tasksController } from './resourses/tasks/tasks.router';
import { usersController } from './resourses/users/users.router';

dotenv.config();

/**
 * Creates server
 * @param req - request from user
 * @param reply - reply to user
 * @return  error or requested data
 */

console.log('port: ', process.env.PORT);
export const app = createServer((request: IncomingMessage, response: ServerResponse) => {
    try{
        const url = request.url as string;
        console.log(request.method, ': ', url);
        if(url.startsWith('/users')){
            return usersController(request, response);
        }
        if(url.startsWith('/boards')){
            if(url.includes('/tasks')){
              return tasksController(request,response);
            }
          return boardsController(request, response);
        }
    }catch (e){
        console.log('error e:', e)
        response.end(JSON.stringify(e));
    }
    response.end('petrucchoe');
})