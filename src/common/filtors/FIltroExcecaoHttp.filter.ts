import { ExceptionFilter, HttpException, ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";

@Catch()
export class FiltroExcecacaoHttp implements ExceptionFilter {

    private adapterHttp: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.adapterHttp = adapterHost.httpAdapter;
    }

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const { status, body } = exception instanceof HttpException ?
            { 
                status: exception.getStatus(), 
                body: exception.getResponse() 
            } :
            { 
                status: HttpStatus.INTERNAL_SERVER_ERROR, 
                body: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: exception.message, timestamp: new Date().toISOString(), path: request.path } 
            };

        this.adapterHttp.reply(response, body, status);

    }
}