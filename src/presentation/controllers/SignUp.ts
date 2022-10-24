import { IController } from '../contracts/IController';
import { IEmailValidator } from '../contracts/IEmailValidator';
import { IHttpRequest, IHttpResponse } from '../contracts/IHttp';
import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest } from '../helpers/badRquest';

export class SignUpController implements IController {
  private readonly _emailValidator: IEmailValidator;

  constructor(emailValidator: IEmailValidator) {
    this._emailValidator = emailValidator;
  }

  public handle(httpRequest: IHttpRequest): IHttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
    }

    const isEmailValid = this._emailValidator.isValid(httpRequest.body.email);

    if (!isEmailValid) return badRequest(new InvalidParamError('email'));

    return {
      statusCode: 200,
      body: {}
    };
  }
}
