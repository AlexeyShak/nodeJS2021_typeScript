"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestDataExtractor = void 0;
const requestDataExtractor = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body = body + chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
    });
};
exports.requestDataExtractor = requestDataExtractor;
//# sourceMappingURL=request.js.map