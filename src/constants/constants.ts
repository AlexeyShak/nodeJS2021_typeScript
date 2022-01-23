export const REQUEST_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export const STATUS_CODES = {
    NOT_FOUND: 404,
    OK: 200,
    CREATED: 201,
    SERVER_ERROR: 500,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    FORBIDDEN: 403
};

export enum LOG_LEVELS {
    ALL = 0,
    INFO = 1,
    WARN = 2,
    DEBUG = 3,
    ERROR = 4
}