import { IncomingMessage } from 'http';

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