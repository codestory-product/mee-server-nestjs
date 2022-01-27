import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiHandleError } from "./error";

export class APIHandleException extends HttpException {

    readonly apiError: ApiHandleError;

    constructor(apiError: ApiHandleError) {
        super('HandleApiError', apiError.statusCode);
        this.apiError = apiError;
    }

}