import * as http from 'http';
import { boardsController } from './resourses/boards/board.router';
import { tasksController } from './resourses/tasks/tasks.router';
import { usersController } from './resourses/users/users.router';
require('dotenv').config();


console.log('port: ', process.env.PORT);
http.createServer((request: any, response: any) => {
    try{
        const url: string = request.url;
        if(url.startsWith('/users')){
            return usersController(request, response);
        }
        else if(url.startsWith('/boards')){
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

}).listen(process.env.PORT)