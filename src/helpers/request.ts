import {Request} from 'express';

export const requestDataExtractor = (req: Request): Promise<string> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk: BinaryData) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (e) => {
            reject(JSON.stringify(e));
        });
    })
}