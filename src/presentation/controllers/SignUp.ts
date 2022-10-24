import { IHttpRequest, IHttpResponse } from '../contracts/http.contract';
import { MissingParamError } from '../errors';

export class SignUpController {
  public handle(httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('Missing param: name')
      };
    }

    return {
      statusCode: 400,
      body: new MissingParamError('Missing param: email')
    };
  }
}
