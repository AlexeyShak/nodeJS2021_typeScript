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
exports.boardsController = void 0;
const constants_1 = require("../../constants/constants");
const errors_1 = require("../../constants/errors");
const response_1 = require("../../helpers/response");
const board_service_1 = require("./board.service");
const request_1 = require("../../helpers/request");
const boardValidator_1 = require("../../validators/boardValidator");
const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/boards\/.+/;
const boardsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.method === constants_1.REQUEST_METHODS.GET && req.url === '/boards') {
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.OK, (0, board_service_1.getAllBoards)());
        }
        if (req.method === constants_1.REQUEST_METHODS.GET && urlValidator.test(req.url)) {
            const boardId = req.url.split('/')[2];
            if (!uuidValidator.test(boardId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const user = (0, board_service_1.getBoardById)(boardId);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.OK, user);
        }
        if (req.method === constants_1.REQUEST_METHODS.POST && req.url === '/boards') {
            const data = yield (0, request_1.requestDataExtractor)(req);
            let boardObj;
            try {
                boardObj = JSON.parse(data);
            }
            catch (e) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.SERVER_ERROR, errors_1.ERRORS.JSON_PARSE_ERR);
            }
            (0, boardValidator_1.postBoardObjValidator)(boardObj);
            (0, board_service_1.createBoard)(boardObj);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.CREATED, boardObj);
        }
        if (req.method === constants_1.REQUEST_METHODS.PUT && urlValidator.test(req.url)) {
            const boardId = req.url.split('/')[2];
            if (!uuidValidator.test(boardId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const data = yield (0, request_1.requestDataExtractor)(req);
            let boardObj;
            try {
                boardObj = JSON.parse(data);
            }
            catch (e) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.SERVER_ERROR, errors_1.ERRORS.JSON_PARSE_ERR);
            }
            (0, boardValidator_1.putBoardObjValidator)(boardObj);
            let board = (0, board_service_1.updateBoard)(boardObj, boardId);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.CREATED, board);
        }
        else if (req.method === constants_1.REQUEST_METHODS.DELETE && urlValidator.test(req.url)) {
            const boardId = req.url.split('/')[2];
            if (!uuidValidator.test(boardId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            ;
            const deletionResult = (0, board_service_1.deleteBoard)(boardId);
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
exports.boardsController = boardsController;
//# sourceMappingURL=board.router.js.map