export const requestDataExtractor = (req): Promise<string> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk: BinaryData) => {
            body = body + chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
    });
}