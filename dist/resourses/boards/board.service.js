"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getBoardById = exports.getAllBoards = void 0;
const { v4: uuidv4 } = require('uuid');
const errors_1 = require("../../constants/errors");
const constants_1 = require("../../constants/constants");
const board_memory_repository_1 = require("./board.memory.repository");
const tasks_memory_repository_1 = require("../tasks/tasks.memory.repository");
const getAllBoards = () => board_memory_repository_1.boards;
exports.getAllBoards = getAllBoards;
const getBoardById = (boardId) => {
    const result = board_memory_repository_1.boards.find(el => el.id === boardId);
    if (!result)
        throw { message: errors_1.ERRORS.BOARD_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    return result;
};
exports.getBoardById = getBoardById;
const createBoard = (boardData) => {
    boardData.id = uuidv4();
    board_memory_repository_1.boards.push(boardData);
    return boardData;
};
exports.createBoard = createBoard;
const updateBoard = (newBoardData, boardId) => {
    const result = board_memory_repository_1.boards.findIndex(el => el.id === boardId);
    if (result == -1)
        throw { message: errors_1.ERRORS.BOARD_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    board_memory_repository_1.boards[result].title = newBoardData.title || board_memory_repository_1.boards[result].title;
    board_memory_repository_1.boards[result].columns = newBoardData.columns || board_memory_repository_1.boards[result].columns;
    return board_memory_repository_1.boards[result];
};
exports.updateBoard = updateBoard;
const deleteBoard = (boardId) => {
    const result = board_memory_repository_1.boards.filter(el => el.id !== boardId);
    if (result.length === board_memory_repository_1.boards.length) {
        return errors_1.ERRORS.BOARD_NOT_FOUND;
    }
    board_memory_repository_1.boards = result;
    tasks_memory_repository_1.tasks = tasks_memory_repository_1.tasks.filter(el => el.boardId !== boardId);
    return constants_1.STATUS_CODES.NO_CONTENT;
};
exports.deleteBoard = deleteBoard;
//# sourceMappingURL=board.service.js.map