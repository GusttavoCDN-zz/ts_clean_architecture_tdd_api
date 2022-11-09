import { IAddAccount, IEmailValidator, IHttpRequest } from './signup.contracts';
import { InvalidParamError, MissingParamError, ServerError } from '../../errors';
import { SignUpController } from './SignUp';

interface ISut {
  sut: SignUpController
  emailValidatorStub: jest.Mocked<IEmailValidator>
  addAccountStub: jest.Mocked<IAddAccount>
}

const fakeRequest: IHttpRequest = {
  body: {
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
};

const makeSut = (): ISut => {
  const emailValidatorStub: jest.Mocked<IEmailValidator> = {
    isValid: jest.fn().mockReturnValue(true)
  };

  const addAccountStub: jest.Mocked<IAddAccount> = {
    add: jest.fn().mockResolvedValue({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
  };

  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return { sut, emailValidatorStub, addAccountStub };
};

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: 'test@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'test@gmail.com',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'test@gmail.com',
        password: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  it('Should return 400 if email provided is invalid', async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest: IHttpRequest = {
      body: { ...fakeRequest.body, email: 'invalid_email@email.com' }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('Should return 400 if passwordConfirmation is diferent to password', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        ...fakeRequest.body,
        passwordConfirmation: 'invalid_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'));
  });

  it('Should  ensure that isValid is called with email provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValid = jest.spyOn(emailValidatorStub, 'isValid');
    await sut.handle(fakeRequest);
    expect(isValid).toHaveBeenCalledWith(fakeRequest.body.email);
  });

  it('Should return 500 if EmailValidator throws an error', async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new ServerError('null');
    });

    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError('null'));
  });

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, 'add');

    await sut.handle(fakeRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: fakeRequest.body.name,
      email: fakeRequest.body.email,
      password: fakeRequest.body.password
    });
  });

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();

    addAccountStub.add.mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: new ServerError('null')
    });
  });

  it('Should return 200 if account is added with sucess', async () => {
    const { sut } = makeSut();

    const accountInfo = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: { id: 'valid_id', ...accountInfo }
    });
  });
});
