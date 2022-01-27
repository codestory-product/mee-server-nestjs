import { HttpStatus } from "@nestjs/common";
import { API_ERROR_TYPE } from "./error-type";

export interface ApiHandleError {
    message: string[],
    error: API_ERROR_TYPE,
    statusCode: HttpStatus
}