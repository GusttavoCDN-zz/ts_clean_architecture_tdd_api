import { IEmailValidator } from '../presentation/contracts/IEmailValidator';

export class EmailValidatorAdapter implements IEmailValidator {
  public isValid(email: string): boolean {
    return false;
  }
}
