
import { REQUEST_METHODS, STATUS_CODES} from '../../constants/constants';
import  { ERRORS } from '../../constants/errors';

import  {sendResponse} from '../../helpers/response';
import {getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard} from './board.service'

import {requestDataExtractor} from '../../helpers/request';
import {postBoardObjValidator, putBoardObjValidator} from '../../validators/boardValidator';
import { IBoardCreate, IBoardUpdate } from '../../interfaces/boards';

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/boards\/.+/;


export const boardsController = async (req, res) =>{ 
    try {
        if(req.method === REQUEST_METHODS.GET && req.url === '/boards' ){
            return sendResponse(res, STATUS_CODES.OK, getAllBoards());
        }
        if(req.method === REQUEST_METHODS.GET && urlValidator.test(req.url)){
            const boardId:string = req.url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const user = getBoardById(boardId);
            return sendResponse(res, STATUS_CODES.OK, user);
        }
        if(req.method === REQUEST_METHODS.POST && req.url === '/boards'){
           const data = await requestDataExtractor(req);
           let boardObj: IBoardCreate;
           try {
                boardObj = JSON.parse(data);
           } catch(e) {
            return sendResponse(res, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
           }
               postBoardObjValidator(boardObj);
               createBoard(boardObj)
               return sendResponse(res, STATUS_CODES.CREATED, boardObj)
        }
        if(req.method ===REQUEST_METHODS.PUT && urlValidator.test(req.url)){
            const boardId:string = req.url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
            }
            const data = await requestDataExtractor(req);
            let boardObj: IBoardUpdate;
            try {
                boardObj = JSON.parse(data);
            } catch(e) {
            return sendResponse(res, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
            }
               putBoardObjValidator(boardObj);
               let board = updateBoard(boardObj, boardId);
               return sendResponse(res, STATUS_CODES.OK, board);
        }
        else if(req.method === REQUEST_METHODS.DELETE && urlValidator.test(req.url)){
            const boardId: string = req.url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);
            };
            const deletionResult = deleteBoard(boardId);
            if(typeof deletionResult === 'string'){
                return sendResponse(res, STATUS_CODES.NOT_FOUND, deletionResult);
            }
            return sendResponse(res, deletionResult);
        }
    } catch (e) {
        const status = e.status ? e.status : STATUS_CODES.SERVER_ERROR;
        sendResponse(res, status, e);
    }
}