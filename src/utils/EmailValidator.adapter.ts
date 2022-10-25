import { IEmailValidator } from '../presentation/contracts/IEmailValidator';
import Validator from 'validator';

export class EmailValidatorAdapter implements IEmailValidator {
  public isValid(email: string): boolean {
    return Validator.isEmail(email);
  }
}
