import { IController } from '../contracts/IController';
import { IHttpRequest, IHttpResponse } from '../contracts/IHttp';
import { MissingParamError } from '../errors';
import { badRequest } from '../helpers/badRquest';

export class SignUpController implements IController {
  // private readonly _emailValidator: IEmailValidator;

  // constructor(emailValidator: IEmailValidator) {
  //   this._emailValidator = emailValidator;
  // }

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
