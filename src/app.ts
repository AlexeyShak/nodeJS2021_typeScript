import * as http from 'http';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { boardsController } from './resourses/boards/board.router';
import { tasksController } from './resourses/tasks/tasks.router';
import { usersController } from './resourses/users/users.router';

dotenv.config();

console.log('port: ', process.env.PORT);
export const app = http.createServer((request: Request, response: Response) => {
    try{
        const {url} = request;
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