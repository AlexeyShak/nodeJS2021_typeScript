"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModify = exports.taskFilter = exports.getTasks = exports.tasks = void 0;
const { v4: uuidv4 } = require('uuid');
exports.tasks = [{
        id: 'c8f746c3-7089-4abc-af07-000000000000',
        title: 'Random title',
        order: 1,
        description: 'Some description',
        userId: null,
        boardId: 'c8f746c3-7089-4abc-af07-d66c5548b8f0',
        columnId: "11111111-0000-0000-0000-000000000000",
    },
    {
        id: "00000000-0000-0000-0000-000000000001",
        title: 'Task 2',
        order: 2,
        description: 'Some other description',
        userId: '73dfa0d7-e233-4762-9037-5ac8f433c971',
        boardId: '00000000-0000-0000-0000-000000000000',
        columnId: "22222222-0000-0000-0000-000000000000"
    }
];
const getTasks = () => {
    return exports.tasks;
};
exports.getTasks = getTasks;
const taskFilter = (boardId) => {
    exports.tasks = exports.tasks.filter(el => el.boardId !== boardId);
};
exports.taskFilter = taskFilter;
const taskModify = (data) => {
    exports.tasks = data;
};
exports.taskModify = taskModify;
//# sourceMappingURL=tasks.memory.repository.js.map