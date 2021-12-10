"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, status, data) => {
    res.writeHeader(status, {
        'Content-Type': 'application/json'
    });
    res.end(data ? JSON.stringify(data) : '');
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=response.js.map