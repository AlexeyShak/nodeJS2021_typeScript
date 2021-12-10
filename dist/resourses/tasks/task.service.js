"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = exports.unassignUserAfterDelete = void 0;
const { v4: uuidv4 } = require('uuid');
const errors_1 = require("../../constants/errors");
const constants_1 = require("../../constants/constants");
const tasks_memory_repository_1 = require("./tasks.memory.repository");
const board_service_1 = require("../boards/board.service");
const unassignUserAfterDelete = (userId) => {
    for (let i = 0; i < tasks_memory_repository_1.tasks.length; i++) {
        if (tasks_memory_repository_1.tasks[i].userId === userId) {
            tasks_memory_repository_1.tasks[i].userId = null;
        }
    }
};
exports.unassignUserAfterDelete = unassignUserAfterDelete;
const getAllTasks = (boardId) => {
    (0, board_service_1.getBoardById)(boardId);
    const tasksFromBoard = tasks_memory_repository_1.tasks.filter(el => el.boardId === boardId);
    return tasksFromBoard;
};
exports.getAllTasks = getAllTasks;
const getTaskById = (boardId, taskId) => {
    const boardWithTasks = (0, board_service_1.getBoardById)(boardId);
    const result = tasks_memory_repository_1.tasks.find(el => el.id === taskId);
    if (!result)
        throw { message: errors_1.ERRORS.TASK_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    if (boardWithTasks.id !== result.boardId)
        throw { message: errors_1.ERRORS.TASK_FROM_ANOTHER_BOARD, status: constants_1.STATUS_CODES.BAD_REQUEST };
    return result;
};
exports.getTaskById = getTaskById;
const createTask = (taskData, boardId) => {
    (0, board_service_1.getBoardById)(boardId);
    taskData.id = uuidv4();
    tasks_memory_repository_1.tasks.push(taskData);
    return taskData;
};
exports.createTask = createTask;
const updateTask = (newTaskData, boardId, taskId) => {
    (0, board_service_1.getBoardById)(boardId);
    const result = tasks_memory_repository_1.tasks.findIndex(el => el.id === taskId);
    if (result === -1)
        throw { message: errors_1.ERRORS.TASK_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    tasks_memory_repository_1.tasks[result].title = newTaskData.title || tasks_memory_repository_1.tasks[result].title;
    tasks_memory_repository_1.tasks[result].order = newTaskData.order || tasks_memory_repository_1.tasks[result].order;
    tasks_memory_repository_1.tasks[result].description = newTaskData.description || tasks_memory_repository_1.tasks[result].description;
    tasks_memory_repository_1.tasks[result].userId = newTaskData.userId || tasks_memory_repository_1.tasks[result].userId;
    tasks_memory_repository_1.tasks[result].columnId = newTaskData.columnId || tasks_memory_repository_1.tasks[result].columnId;
    tasks_memory_repository_1.tasks[result].boardId = newTaskData.boardId || tasks_memory_repository_1.tasks[result].boardId;
    return tasks_memory_repository_1.tasks[result];
};
exports.updateTask = updateTask;
const deleteTask = (boardId, taskId) => {
    const boardWithTasks = (0, board_service_1.getBoardById)(boardId);
    const result = tasks_memory_repository_1.tasks.filter(el => el.id !== taskId);
    if (result.length === tasks_memory_repository_1.tasks.length)
        throw { message: errors_1.ERRORS.TASK_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    const taskTodelete = tasks_memory_repository_1.tasks.find(el => el.id === taskId);
    if (boardWithTasks.id !== taskTodelete.boardId)
        throw { message: errors_1.ERRORS.TASK_FROM_ANOTHER_BOARD, status: constants_1.STATUS_CODES.BAD_REQUEST };
    (0, tasks_memory_repository_1.taskModify)(result);
    return constants_1.STATUS_CODES.NO_CONTENT;
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.service.js.map