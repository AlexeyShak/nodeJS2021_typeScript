import { IncomingMessage, ServerResponse } from 'http';
import jwt from 'jsonwebtoken';
import process from 'process';


export function authMiddleware (req:IncomingMessage, res:ServerResponse) {
    try {
            console.log (1)
            if(!!req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
            }else {
                res.writeHead(403)
                res.end('User is not authorized');
            }
        }catch (e) {
            console.log('error e:', e);
            res.end(JSON.stringify(e));
    }
}