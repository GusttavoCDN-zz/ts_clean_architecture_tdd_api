import { MissingParamError } from '../errors';
import { SignUpController } from './SignUp';

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    // sut = system under test
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: 'test@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing param: name'));
  });

  it('Should return 400 if no name is provided', () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing param: email'));
  });
});
