// message, status code, error codes, error
export class HttpException extends Error {
    constructor(message, errorCode, statusCode, error) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.error = error;
    }
}
export var ErroCodes;
(function (ErroCodes) {
    ErroCodes[ErroCodes["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErroCodes[ErroCodes["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErroCodes[ErroCodes["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
})(ErroCodes || (ErroCodes = {}));
