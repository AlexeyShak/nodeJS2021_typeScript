"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const board_router_1 = require("./resourses/boards/board.router");
const tasks_router_1 = require("./resourses/tasks/tasks.router");
const users_router_1 = require("./resourses/users/users.router");
require('dotenv').config();
console.log('port: ', process.env.PORT);
http.createServer((request, response) => {
    try {
        const url = request.url;
        if (url.startsWith('/users')) {
            return (0, users_router_1.usersController)(request, response);
        }
        else if (url.startsWith('/boards')) {
            if (url.includes('/tasks')) {
                return (0, tasks_router_1.tasksController)(request, response);
            }
            return (0, board_router_1.boardsController)(request, response);
        }
    }
    catch (e) {
        console.log('error e:', e);
        response.end(JSON.stringify(e));
    }
    response.end('petrucchoe');
}).listen(process.env.PORT);
//# sourceMappingURL=app.js.map