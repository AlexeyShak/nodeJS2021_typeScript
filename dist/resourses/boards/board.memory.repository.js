"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBoards = exports.getBoards = void 0;
let boards = [{
        id: 'c8f746c3-7089-4abc-af07-d66c5548b8f0',
        title: 'Random board',
        columns: []
    },
    {
        id: "00000000-0000-0000-0000-000000000000",
        title: 'Random board',
        columns: []
    }
];
const getBoards = () => {
    return boards;
};
exports.getBoards = getBoards;
const setBoards = (data) => {
    boards = data;
};
exports.setBoards = setBoards;
//# sourceMappingURL=board.memory.repository.js.map