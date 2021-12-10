export const sendResponse = (res, status: number, data?: string | object) => {
    res.writeHeader(status, {
        'Content-Type': 'application/json'
      });
    res.end(data ? JSON.stringify(data): '');
}