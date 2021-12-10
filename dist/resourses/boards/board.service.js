"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getBoardById = exports.getAllBoards = void 0;
const { v4: uuidv4 } = require('uuid');
const errors_1 = require("../../constants/errors");
const constants_1 = require("../../constants/constants");
const board_memory_repository_1 = require("./board.memory.repository");
const tasks_memory_repository_1 = require("../tasks/tasks.memory.repository");
const getAllBoards = () => (0, board_memory_repository_1.getBoards)();
exports.getAllBoards = getAllBoards;
const getBoardById = (boardId) => {
    const result = (0, board_memory_repository_1.getBoards)().find(el => el.id === boardId);
    if (!result)
        throw { message: errors_1.ERRORS.BOARD_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    return result;
};
exports.getBoardById = getBoardById;
const createBoard = (boardData) => {
    boardData.id = uuidv4();
    (0, board_memory_repository_1.getBoards)().push(boardData);
    console.log('board creation result', (0, board_memory_repository_1.getBoards)());
    return boardData;
};
exports.createBoard = createBoard;
const updateBoard = (newBoardData, boardId) => {
    const boards = (0, board_memory_repository_1.getBoards)();
    const result = boards.findIndex(el => el.id === boardId);
    if (result == -1)
        throw { message: errors_1.ERRORS.BOARD_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    boards[result].title = newBoardData.title || boards[result].title;
    boards[result].columns = newBoardData.columns || boards[result].columns;
    return boards[result];
};
exports.updateBoard = updateBoard;
const deleteBoard = (boardId) => {
    let boards = (0, board_memory_repository_1.getBoards)();
    const result = boards.filter(el => el.id !== boardId);
    if (result.length === boards.length)
        throw { message: errors_1.ERRORS.BOARD_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    (0, board_memory_repository_1.setBoards)(result);
    (0, tasks_memory_repository_1.taskFilter)(boardId);
    return constants_1.STATUS_CODES.NO_CONTENT;
};
exports.deleteBoard = deleteBoard;
//# sourceMappingURL=board.service.js.map