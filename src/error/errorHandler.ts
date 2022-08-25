export class ErrorHandler extends Error {
    message: string;
    statusCode: number;
    error: string;

    constructor(
        message: string = 'Internal Server Error',
        status: number = 500,
        error: string = 'Something went wrong'
    ) {
        super();
        this.message = message;
        this.statusCode = status;
        this.error = error;

        Error.captureStackTrace(this, this.constructor);
    }
}
