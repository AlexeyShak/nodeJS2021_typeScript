"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const uuid_1 = require("uuid");
const constants_1 = require("../../constants/constants");
const errors_1 = require("../../constants/errors");
const users_memory_repository_1 = require("./users.memory.repository");
const task_service_1 = require("../tasks/task.service");
const getAllUsers = () => {
    return users_memory_repository_1.users.map(el => {
        delete el.password;
        return el;
    });
};
exports.getAllUsers = getAllUsers;
const getUserById = (userId) => {
    const result = users_memory_repository_1.users.find(el => el.id === userId);
    if (!result)
        throw { message: errors_1.ERRORS.USER_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    delete result.password;
    return result;
};
exports.getUserById = getUserById;
const createUser = (newUser) => {
    newUser.id = (0, uuid_1.v4)();
    users_memory_repository_1.users.push(newUser);
};
exports.createUser = createUser;
const updateUser = (updatedUser, userId) => {
    let result = users_memory_repository_1.users.findIndex(el => el.id === userId);
    if (result === -1)
        throw { message: errors_1.ERRORS.USER_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    users_memory_repository_1.users[result].name = updatedUser.name || users_memory_repository_1.users[result].name;
    users_memory_repository_1.users[result].login = updatedUser.login || users_memory_repository_1.users[result].login;
    users_memory_repository_1.users[result].password = updatedUser.password || users_memory_repository_1.users[result].password;
    return users_memory_repository_1.users[result];
};
exports.updateUser = updateUser;
const deleteUser = (userId) => {
    const result = users_memory_repository_1.users.filter(el => el.id !== userId);
    if (result.length === users_memory_repository_1.users.length)
        throw { message: errors_1.ERRORS.USER_NOT_FOUND, status: constants_1.STATUS_CODES.NOT_FOUND };
    (0, users_memory_repository_1.usersModify)(result);
    (0, task_service_1.unassignUserAfterDelete)(userId);
    return constants_1.STATUS_CODES.NO_CONTENT;
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.service.js.map