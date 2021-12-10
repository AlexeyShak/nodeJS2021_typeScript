"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModify = exports.users = void 0;
const { v4: uuidv4 } = require('uuid');
exports.users = [{
        id: '73dfa0d7-e233-4762-9037-5ac8f433c971',
        name: 'Random User',
        login: 'login',
        password: 'password'
    },
    {
        id: "73dfa0d7-e233-4762-0000-000000000000",
        name: 'Alesha',
        login: 'login',
        password: 'password'
    }];
const usersModify = (data) => {
    exports.users = data;
};
exports.usersModify = usersModify;
//# sourceMappingURL=users.memory.repository.js.map