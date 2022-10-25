import { EmailValidatorAdapter } from './EmailValidator.adapter';
import Validator from 'validator'

beforeAll(() => {
  jest.spyOn(Validator, 'isEmail').mockReturnValue(true);
})

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();

    jest.spyOn(Validator, 'isEmail').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid_email@gmail.com');
    expect(isValid).toBe(false);
  });

  it('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('valid_email@gmail.com');

    expect(isValid).toBe(true);
  });

  it('Should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter();

    const validatorSpy = jest.spyOn(Validator, 'isEmail');

    sut.isValid('any_email@gmail.com');
    expect(validatorSpy).toHaveBeenCalledWith('any_email@gmail.com');
  });
});
