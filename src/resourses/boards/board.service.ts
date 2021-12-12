import {ERRORS} from '../../constants/errors';
import  {STATUS_CODES} from '../../constants/constants';
import {getBoards, setBoards} from './board.memory.repository';
import {taskFilter} from '../tasks/tasks.memory.repository';
import { IBoard, IBoardUpdate } from '../../interfaces/boards';

import {v4 as uuidv4} from 'uuid';
/**
 * Function which returns all boards to boards router
 * @return all boards instanse of IBoard[] to boards router
 */

export const getAllBoards = () => getBoards();
/**
 * Function which returns board with requested ID to boards router
 * @param boardId - part of request url instance of string
 * @return board with requested ID instanse of IBoard
 */

export const getBoardById = (boardId: string): IBoard => {
    const result = getBoards().find(el => el.id === boardId);
    if(!result) throw { message: ERRORS.BOARD_NOT_FOUND, status: STATUS_CODES.NOT_FOUND}
    return result;
};
/**
 * Function which creates new board and returns it to boards router
 * @param boardData - requested board data instance of IBoard
 * @return board with ID instanse of IBoard
 */
export const createBoard = (boardData: IBoard): IBoard => {
    boardData.id = uuidv4();
    getBoards().push(boardData);
    return boardData;
};
/**
 * Function which creates new board and returns it to boards router
 * @param newBoardData - requested board data instance of IBoardUpdate
 * @return updated board instanse of IBoard
 */
export const updateBoard = (newBoardData: IBoardUpdate, boardId: string): IBoard => {
    const boards = getBoards();
    const result = boards.findIndex(el => el.id === boardId);
    if(result == -1) throw {message: ERRORS.BOARD_NOT_FOUND, status: STATUS_CODES.NOT_FOUND}
    boards[result].title = newBoardData.title || boards[result].title;
    boards[result].columns = newBoardData.columns || boards[result].columns;
    return boards[result];
};
/**
 * Function which deletes board with requested ID
 * @param newBoardData - requested boardID instance of string
 * @return status code 'no content' instanse of number to board service
 */
export const deleteBoard = (boardId: string): number => {
    const boards = getBoards();
    const result = boards.filter(el => el.id !== boardId);
    if(result.length === boards.length) throw {message: ERRORS.BOARD_NOT_FOUND , status: STATUS_CODES.NOT_FOUND};
    setBoards(result);
    taskFilter(boardId);
    return STATUS_CODES.NO_CONTENT;
}
