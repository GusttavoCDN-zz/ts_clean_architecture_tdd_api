import { IEmailValidator } from '../contracts/IEmailValidator';
import { InvalidParamError, MissingParamError } from '../errors';
import { SignUpController } from './SignUp';

interface ISut {
  sut: SignUpController
  emailValidatorStub: jest.Mocked<IEmailValidator>
}

const makeSut = (): ISut => {
  const emailValidatorStub: jest.Mocked<IEmailValidator> = {
    isValid: jest.fn().mockReturnValue(true)
  };

  const sut = new SignUpController(emailValidatorStub);
  return { sut, emailValidatorStub };
};

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: 'test@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('Should return 400 if no name is provided', () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('Should return 400 if no password is provided', () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'test@gmail.com',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('Should return 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'test@gmail.com',
        password: 'any_password'
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  it('Should return 400 if email provided is invalid', () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('Should  ensure that isValid is called with email provided', () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValid = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    sut.handle(httpRequest);
    expect(isValid).toHaveBeenCalledWith(httpRequest.body.email);
  });
});
