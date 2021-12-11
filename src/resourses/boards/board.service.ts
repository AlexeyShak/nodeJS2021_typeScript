import {ERRORS} from '../../constants/errors';
import  {STATUS_CODES} from '../../constants/constants';
import {getBoards, setBoards} from './board.memory.repository';
import {taskFilter} from '../tasks/tasks.memory.repository';
import { IBoard, IBoardCreate, IBoardUpdate } from '../../interfaces/boards';

import {v4 as uuidv4} from 'uuid';

export const getAllBoards = () => getBoards();

export const getBoardById = (boardId:string):IBoard => {
    const result = getBoards().find(el => el.id === boardId);
    if(!result) throw { message: ERRORS.BOARD_NOT_FOUND, status: STATUS_CODES.NOT_FOUND}
    return result;
};

export const createBoard = (boardData:IBoardCreate):IBoard => {
    boardData.id = uuidv4();
    getBoards().push(boardData);
    return boardData;
};

export const updateBoard = (newBoardData:IBoardUpdate, boardId:string):IBoard => {
    const boards = getBoards();
    const result = boards.findIndex(el => el.id === boardId);
    if(result == -1) throw {message: ERRORS.BOARD_NOT_FOUND, status: STATUS_CODES.NOT_FOUND}
    boards[result].title = newBoardData.title || boards[result].title;
    boards[result].columns = newBoardData.columns || boards[result].columns;
    return boards[result];
};

export const deleteBoard = (boardId:string):number => {
    const boards = getBoards();
    const result = boards.filter(el => el.id !== boardId);
    if(result.length === boards.length) throw {message: ERRORS.BOARD_NOT_FOUND , status: STATUS_CODES.NOT_FOUND};
    setBoards(result);
    taskFilter(boardId);
    return STATUS_CODES.NO_CONTENT;
}
