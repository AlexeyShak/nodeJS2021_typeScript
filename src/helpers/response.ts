import { ServerResponse } from 'http';

/**
 * Module to form responses to User
 * @param res - resoponse to server
 * @param status - status code is responsed to User
 * @param data - data which is responsed to User
 * @return void
 */
export const sendResponse = (res: ServerResponse, status: number, data?: string | object): void => {
    res.writeHead(status, {
        'Content-Type': 'application/json'
      });
    res.end(data ? JSON.stringify(data): '');
}