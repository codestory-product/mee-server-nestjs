import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { APIHandleException } from "./error.exception";

@Catch()
export class ApiErrorFilter implements ExceptionFilter {

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus = 
            exception instanceof APIHandleException
                ? exception.apiError.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;

        console.log(exception);

        let responseBody;
        if(exception instanceof APIHandleException) {
            responseBody = exception.apiError;
        }
        else {
            responseBody = exception.response;
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

}