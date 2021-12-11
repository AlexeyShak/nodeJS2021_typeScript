import { ServerResponse } from 'http';

export const sendResponse = (res: ServerResponse, status: number, data?: string | object): void => {
    res.writeHead(status, {
        'Content-Type': 'application/json'
      });
    res.end(data ? JSON.stringify(data): '');
}