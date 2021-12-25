const fs = require('fs'); 
const colors = require('colors/safe');
import { IncomingMessage } from 'http';
import { LOG_LEVELS, REQUEST_METHODS } from '../constants/constants';
import { IError } from '../interfaces/errors';


export const logLogger = (logLevel: LOG_LEVELS, data:any) => {
    if(!!process.env.LOG_LEVEL && logLevel < parseInt(process.env.LOG_LEVEL)){
        console.log('No logs of requested LOG_LEVEL(',process.env.LOG_LEVEL,')')
    }
    if(process.env.LOG_IN_FILE){
        if(logLevel === 4){
            const fsLog = fs.createWriteStream('errorlogs.txt', {flags: 'a'});
            fsLog.write(data + '\n');
        }
        const fsLog = fs.createWriteStream('logs.txt', {flags: 'a'});
        fsLog.write(data + '\n');
        
    }
    console.log(data);
}
export const loggerSuccess =  (logLevel: LOG_LEVELS, req: IncomingMessage, status: number, time: number, data?: string | object) => {
    data = JSON.stringify(data);
    const processTime = new Date().getTime() - time;
    const url = req.url as string;
    let query:string[] = [];
    if(url.includes('?')){
        if(url.includes('&')){
            return url.split('?')[1].split('&').forEach(param => query.push(param));
        }
        query.push(url.split('?')[1]);
    }
    let logSuccessStr = `${req.method} ${colors.green(status)} ${processTime}ms ${url}
    query: ${query} 
    `;
    if(req.method === REQUEST_METHODS.POST || req.method === REQUEST_METHODS.PUT){
        logSuccessStr += `
    body: ${data}
    `;
    }
    logLogger(logLevel, logSuccessStr);
}
  
  
export const loggerErrors =  (logLevel: LOG_LEVELS, req: IncomingMessage, status: number, time: number, data?: string | object ): void => {
    const processTime = new Date().getTime() - time;
    const url = req.url as string;
    const errorObj = data as IError;
    let error = '';
    typeof data === 'string'? error = data:error = errorObj.message;
    let logErrorStr = `${req.method} ${colors.red(status)} ${processTime}ms ${url},
    error message: ${error}
    `
    logLogger(logLevel, logErrorStr);
}

export const loggerUncaught = (err: Error, origin: NodeJS.UncaughtExceptionOrigin) => {
    console.log(`
${origin}
Error message: ${colors.red(err)}
`)
}