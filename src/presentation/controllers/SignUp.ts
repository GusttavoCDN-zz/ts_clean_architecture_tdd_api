import { IHttpRequest, IHttpResponse } from '../contracts/http.contract';

export class SignUpController {
  public handle(httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      };
    }

    return {
      statusCode: 400,
      body: new Error('Missing param: email')
    };
  }
}
