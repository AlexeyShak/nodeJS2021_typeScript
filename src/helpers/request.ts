import { IncomingMessage } from 'http';


/**
 * Module to extract data from the response
 * @param req - reqest from server
 * @return Promise with stringified data
 */
export const requestDataExtractor = (req: IncomingMessage): Promise<string> => {
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