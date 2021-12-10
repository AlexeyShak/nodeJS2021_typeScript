export const sendResponse = (res, status: number, data?: string | object):void => {
    res.writeHeader(status, {
        'Content-Type': 'application/json'
      });
    res.end(data ? JSON.stringify(data): '');
}