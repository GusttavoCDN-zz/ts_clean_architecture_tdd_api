import { IAddAccount } from '../../domain/useCases/addAccount';
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../contracts';
import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http.helpers';

export class SignUpController implements IController {
  private readonly _emailValidator: IEmailValidator;
  private readonly _addAccount: IAddAccount;

  constructor(emailValidator: IEmailValidator, addAccount: IAddAccount) {
    this._emailValidator = emailValidator;
    this._addAccount = addAccount;
  }

  public handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isEmailValid = this._emailValidator.isValid(email);

      if (!isEmailValid) return badRequest(new InvalidParamError('email'));

      this._addAccount.add({ email, name, password });

      return {
        statusCode: 200,
        body: {}
      };
    } catch (error: any) {
      return serverError();
    }
  }
}
