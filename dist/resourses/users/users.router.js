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
exports.usersController = void 0;
const constants_1 = require("../../constants/constants");
const errors_1 = require("../../constants/errors");
const request_1 = require("../../helpers/request");
const response_1 = require("../../helpers/response");
const users_service_1 = require("./users.service");
const userValidator_1 = require("../../validators/userValidator");
const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/users\/.+/;
const usersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.method === constants_1.REQUEST_METHODS.GET && req.url === '/users') {
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.OK, (0, users_service_1.getAllUsers)());
        }
        if (req.method === constants_1.REQUEST_METHODS.GET && urlValidator.test(req.url)) {
            const userId = req.url.split('/')[2];
            if (!uuidValidator.test(userId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const user = (0, users_service_1.getUserById)(userId);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.OK, user);
        }
        if (req.method === constants_1.REQUEST_METHODS.POST && req.url === '/users') {
            const data = yield (0, request_1.requestDataExtractor)(req);
            let dataObj;
            try {
                dataObj = JSON.parse(data);
            }
            catch (e) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.SERVER_ERROR, errors_1.ERRORS.JSON_PARSE_ERR);
            }
            (0, userValidator_1.postObjValidator)(dataObj);
            (0, users_service_1.createUser)(dataObj);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.CREATED, dataObj);
        }
        if (req.method === constants_1.REQUEST_METHODS.PUT && urlValidator.test(req.url)) {
            const userId = req.url.split('/')[2];
            if (!uuidValidator.test(userId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            const data = yield (0, request_1.requestDataExtractor)(req);
            let dataObj;
            try {
                dataObj = JSON.parse(data);
            }
            catch (e) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.SERVER_ERROR, errors_1.ERRORS.JSON_PARSE_ERR);
            }
            (0, userValidator_1.putObjValidator)(dataObj);
            let user = (0, users_service_1.updateUser)(dataObj, userId);
            return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.CREATED, user);
        }
        else if (req.method === constants_1.REQUEST_METHODS.DELETE && urlValidator.test(req.url)) {
            const userId = req.url.split('/')[2];
            if (!uuidValidator.test(userId)) {
                return (0, response_1.sendResponse)(res, constants_1.STATUS_CODES.BAD_REQUEST, errors_1.ERRORS.WRONG_ID_FORMAT);
            }
            ;
            const deletionResult = (0, users_service_1.deleteUser)(userId);
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
exports.usersController = usersController;
//# sourceMappingURL=users.router.js.map