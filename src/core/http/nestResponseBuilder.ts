import { NestResponse } from "./nestResponse";

export class NestResponseBuilder {
    private response: NestResponse = {} as NestResponse;

    comStatus(status: number): NestResponseBuilder {
        this.response.status = status;
        return this;
    }

    comHeaders(headers: Object): NestResponseBuilder {
        this.response.headers = headers;
        return this;
    }

    comBody(body: Object): NestResponseBuilder {
        this.response.body = body;
        return this;
    }

    build(): NestResponse {
        return new NestResponse(this.response);
    }
}