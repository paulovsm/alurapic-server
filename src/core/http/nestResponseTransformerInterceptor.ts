import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NestResponse } from "./nestResponse";

@Injectable()
export class NestResponseTransformerInterceptor implements NestInterceptor {
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((response: NestResponse) => {
                if (!(response instanceof NestResponse)) {
                    return response;
                }

                const ctx = context.switchToHttp();
                const responseHttp = ctx.getResponse();

                const { status, headers, body } = response;

                if (headers) {
                    const headersNames = Object.getOwnPropertyNames(headers);
                    headersNames.forEach(headerName => {
                        this.httpAdapter.setHeader(responseHttp, headerName, headers[headerName]);
                    });
                }

                this.httpAdapter.status(responseHttp, status);
                
                return body;
            })
        );
    }
}