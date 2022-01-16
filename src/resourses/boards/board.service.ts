import {ERRORS} from '../../constants/errors';
import  {STATUS_CODES} from '../../constants/constants';
import {Board} from './board.memory.repository';
import { IBoard, IBoardUpdate } from '../../interfaces/boards';

import {v4 as uuidv4} from 'uuid';
import { ColumnEntity } from '../columns/columns';


/**
 * Function which returns all boards to boards router
 * @return all boards instanse of IBoard[] to boards router
 */

export const getAllBoards = async ():Promise<Board[]> => {
    const allBoards = await Board.find({relations: ['columns']});
    return allBoards;
};
/**
 * Function which returns board with requested ID to boards router
 * @param boardId - part of request url instance of string
 * @return board with requested ID instanse of IBoard
 */

export const getBoardById = async (boardId: string): Promise<Board> => {
    const result = await Board.findOne({id: boardId}, { relations: ['columns']});
    if(!result) throw { message: ERRORS.BOARD_NOT_FOUND, status: STATUS_CODES.NOT_FOUND}
    return result;
};
/**
 * Function which creates new board and returns it to boards router
 * @param boardData - requested board data instance of IBoard
 * @return board with ID instanse of IBoard
 */
export const createBoard = async (boardData: IBoard): Promise<Board> => {
    const board = new Board();
    board.id = uuidv4();
    board.title = boardData.title;
    
    const modCol = boardData.columns.map(({title, order}) => { 
        const newColEnt = new ColumnEntity();
        newColEnt.id = uuidv4();
        newColEnt.title = title;
        newColEnt.order = order;
        return newColEnt;
    })

    for(const el of modCol) {
        await el.save();
    }
    
    board.columns = modCol;
    
    await board.save();
    return board;
};
/**
 * Function which creates new board and returns it to boards router
 * @param newBoardData - requested board data instance of IBoardUpdate
 * @return updated board instanse of IBoard
 */
export const updateBoard = async (newBoardData: IBoardUpdate, boardId: string): Promise<Board> => {
    const result = await Board.findOne({id: boardId}, { relations: ['columns']});
    if(!result) throw {message: ERRORS.BOARD_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    result.title = newBoardData.title || result.title;
    if(newBoardData.columns?.length){
        const modCol = newBoardData.columns.map(({id, title, order}) => { 
            const newColEnt = new ColumnEntity();
            if(!id){
                newColEnt.id = uuidv4()
            }else{
                newColEnt.id = id;
            }
            newColEnt.title = title;
            newColEnt.order = order; 
            return newColEnt;
        })
        for(const el of modCol) {
            await el.save();
        }
        result.columns = modCol;
    }

    await result.save();

    return result;
};
/**
 * Function which deletes board with requested ID
 * @param newBoardData - requested boardID instance of string
 * @return status code 'no content' instanse of number to board service
 */
export const deleteBoard = async (boardId: string): Promise<number> => {
    const board = await Board.findOne({id: boardId});
    if(!board) {
        throw {message: ERRORS.USER_NOT_FOUND, status: STATUS_CODES.NOT_FOUND};
    }
   
    await Board.remove(board);
    return STATUS_CODES.NO_CONTENT;
}
