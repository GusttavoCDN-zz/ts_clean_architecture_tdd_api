import { IHttpRequest, IHttpResponse } from '../contracts/http.contract';
import { MissingParamError } from '../errors';
import { badRequest } from '../helpers/badRquest';

export class SignUpController {
  public handle(httpRequest: IHttpRequest): IHttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
    }

    return {
      statusCode: 200,
      body: {}
    };
  }
}
