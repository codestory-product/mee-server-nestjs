import { HttpStatus, Injectable } from '@nestjs/common';
import { APIHandleException } from './error/error.exception';
import { API_ERROR_TYPE } from './error/error-type';

@Injectable()
export class AppService {
  getHello(): string {
    throw new APIHandleException({
      error: "INVALID_ID_LENGTH" ,
      message: ["API ERROR"],
      statusCode: HttpStatus.BAD_REQUEST
    });
  }
}
