const {v4: uuidv4} = require('uuid');

import {ERRORS} from '../../constants/errors';
import  {STATUS_CODES} from '../../constants/constants';
import {boards} from './board.memory.repository';
import {tasks} from '../tasks/tasks.memory.repository';
import { IBoard, IBoardCreate, IBoardUpdate } from '../../interfaces/boards';

export const getAllBoards = () => boards;

export const getBoardById = (boardId:string) => {
    const result = boards.find(el => el.id === boardId);
    if(!result) throw { message: ERRORS.BOARD_NOT_FOUND, status: STATUS_CODES.NOT_FOUND}
    return result;
};

export const createBoard = (boardData:IBoard) => {
    boardData.id = uuidv4();
    boards.push(boardData);
    return boardData;
};

export const updateBoard = (newBoardData:IBoardUpdate, boardId:string) => {
    const result = boards.findIndex(el => el.id === boardId);
    if(result == -1) throw {message: ERRORS.BOARD_NOT_FOUND, status: STATUS_CODES.NOT_FOUND}
    boards[result].title = newBoardData.title || boards[result].title;
    boards[result].columns = newBoardData.columns || boards[result].columns;
    return boards[result];
};

export const deleteBoard = (boardId:string) => {
    const result = boards.filter(el => el.id !== boardId);
    if(result.length === boards.length){
        return ERRORS.BOARD_NOT_FOUND
    }
    boards = result;
    tasks = tasks.filter(el => el.boardId !== boardId);
    return STATUS_CODES.NO_CONTENT;
}
