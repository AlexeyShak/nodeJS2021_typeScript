import { IncomingMessage, ServerResponse } from 'http';
import { LOG_LEVELS, REQUEST_METHODS, STATUS_CODES} from '../../constants/constants';
import  { ERRORS } from '../../constants/errors';

import  {sendResponse} from '../../helpers/response';
import {getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard} from './board.service'

import {requestDataExtractor} from '../../helpers/request';
import {postBoardObjValidator, putBoardObjValidator} from '../../validators/boardValidator';
import { IBoard, IBoardUpdate } from '../../interfaces/boards';
import { IError } from '../../interfaces/errors';
import { logLogger } from '../../helpers/logger';

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/boards\/.+/;

/**
 * Module to controll operations with boards
 * @param req - request from user
 * @param reply - reply to user
 * @return promise with void
 */
export const boardsController = async (req: IncomingMessage, res: ServerResponse, time: number): Promise<void> =>{ 
    const url = req.url as string;
    
    try {
        if(req.method === REQUEST_METHODS.GET && req.url === '/boards' ){
            const allBoards = await getAllBoards();
            return sendResponse(req, res, STATUS_CODES.OK, time, allBoards);
        }
        if(req.method === REQUEST_METHODS.GET && urlValidator.test(url)){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }
            const board = await getBoardById(boardId);
            return sendResponse(req, res, STATUS_CODES.OK,time, board);
        }
        if(req.method === REQUEST_METHODS.POST && req.url === '/boards'){
           const data = await requestDataExtractor(req);
           let boardObj: IBoard;
           try {
                boardObj = JSON.parse(data);
           } catch(e) {
            return sendResponse(req, res, STATUS_CODES.SERVER_ERROR, time, ERRORS.JSON_PARSE_ERR);
           }
               postBoardObjValidator(boardObj);
               const board = await createBoard(boardObj);
               console.log('new board',board)
               return sendResponse(req, res, STATUS_CODES.CREATED, time, board)
        }
        if(req.method ===REQUEST_METHODS.PUT && urlValidator.test(url)){
            const boardId:string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);  
            }
            const data = await requestDataExtractor(req);
            let boardObj: IBoardUpdate;
            try {
                boardObj = JSON.parse(data);
            } catch(e) {
            return sendResponse(req, res, STATUS_CODES.SERVER_ERROR, time, ERRORS.JSON_PARSE_ERR);
            }
               putBoardObjValidator(boardObj);
               const board = await updateBoard(boardObj, boardId);
               console.log('returned board: ', board)
               return sendResponse(req, res, STATUS_CODES.OK, time, board);
        }
        if(req.method === REQUEST_METHODS.DELETE && urlValidator.test(url)){
            const boardId: string = url.split('/')[2];
            if(!uuidValidator.test(boardId)){
                return sendResponse(req, res, STATUS_CODES.BAD_REQUEST, time, ERRORS.WRONG_ID_FORMAT);
            }
            const deletionResult = await deleteBoard(boardId);
            return sendResponse(req, res, deletionResult, time);
        }
    } catch (e) {
        logLogger(LOG_LEVELS.ERROR, `error in catch ${e}`)
        const transformedE = e as IError;
        const status = transformedE?.status ? transformedE.status : STATUS_CODES.SERVER_ERROR;
        sendResponse(req, res, status, time, transformedE);
    }
}