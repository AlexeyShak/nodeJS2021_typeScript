"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksController = void 0;
const constants_1 = require("../../constants/constants");
const errors_1 = require("../../constants/errors");
const response_1 = require("../../helpers/response");
const task_service_1 = require("./task.service");
const request_1 = require("../../helpers/request");
const taskValidator_1 = require("../../validators/taskValidator");
const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const taskIdUrlValidator = /\/boards\/.+\/tasks\/.+/;
const tasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.method === constants_1.REQUEST_METHODS.GET && req.url.endsWith('tasks')) {
            const boardId = req.url.split('/')[2];
            if (!uuidValidator.test(boardId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const getResult = (0, task_service_1.getAllTasks)(boardId);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.OK, getResult);
        }
        if (req.method === constants_1.REQUEST_METHODS.GET && taskIdUrlValidator.test(req.url)) {
            const boardId = req.url.split('/')[2];
            if (!uuidValidator.test(boardId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const taskId = req.url.split('/')[4];
            if (!uuidValidator.test(taskId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const user = (0, task_service_1.getTaskById)(boardId, taskId);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.OK, user);
        }
        if (req.method === constants_1.REQUEST_METHODS.POST && req.url === '/boards') {
            const boardId = req.url.split('/')[2];
            if (!uuidValidator.test(boardId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const data = yield (0, request_1.requestDataExtractor)(req);
            let taskObj;
            try {
                taskObj = JSON.parse(data);
            }
            catch (e) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.SERVER_ERROR, errors_1.ERRORS.JSON_PARSE_ERR);
            }
            (0, taskValidator_1.postTaskObjValidator)(taskObj);
            const task = (0, task_service_1.createTask)(taskObj, boardId);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.CREATED, task);
        }
        if (req.method === constants_1.REQUEST_METHODS.PUT && taskIdUrlValidator.test(req.url)) {
            const boardId = req.url.split('/')[2];
            if (!uuidValidator.test(boardId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const taskId = req.url.split('/')[4];
            if (!uuidValidator.test(taskId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const data = yield (0, request_1.requestDataExtractor)(req);
            let taskObj;
            try {
                taskObj = JSON.parse(data);
            }
            catch (e) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.SERVER_ERROR, errors_1.ERRORS.JSON_PARSE_ERR);
            }
            (0, taskValidator_1.putTaskObjValidator)(taskObj);
            let task = (0, task_service_1.updateTask)(taskObj, boardId, taskId);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.OK, task);
        }
        else if (req.method === constants_1.REQUEST_METHODS.DELETE && taskIdUrlValidator.test(req.url)) {
            const boardId = req.url.split('/')[2];
            if (!uuidValidator.test(boardId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const taskId = req.url.split('/')[4];
            if (!uuidValidator.test(taskId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const deletionResult = (0, task_service_1.deleteTask)(boardId, taskId);
            if (typeof deletionResult === 'string') {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.NOT_FOUND, deletionResult);
            }
            return (0, response_1.sendResponse)(res, deletionResult);
        }
    }
    catch (e) {
        const status = e.status ? e.status : constants_1.STATUS_CODES.SERVER_ERROR;
        (0, response_1.sendResponse)(res, status, e);
    }
});
exports.tasksController = tasksController;
//# sourceMappingURL=tasks.router.js.map