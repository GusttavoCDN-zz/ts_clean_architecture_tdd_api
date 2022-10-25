import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, sucess } from '../../helpers/http.helpers';
import { IAddAccount, IController, IEmailValidator, IHttpRequest, IHttpResponse } from './signup.contracts';

export class SignUpController implements IController {
  private readonly _emailValidator: IEmailValidator;
  private readonly _addAccount: IAddAccount;

  constructor(emailValidator: IEmailValidator, addAccount: IAddAccount) {
    this._emailValidator = emailValidator;
    this._addAccount = addAccount;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
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

      const account = await this._addAccount.add({ email, name, password });

      return sucess(account);
    } catch (error: any) {
      return serverError();
    }
  }
}
