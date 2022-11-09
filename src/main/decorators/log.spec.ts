import { ILogErrorRepository } from '../../data/contracts/ILogErrorRepository';
import { IController } from '../../presentation/contracts';
import { serverError } from '../../presentation/helpers/http.helpers';
import { LogControllerDecorator } from './log';

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: jest.Mocked<IController>
  logRepositoryStub: jest.Mocked<ILogErrorRepository>
}

const makeSut = (): SutTypes => {
  const controllerStub: jest.Mocked<IController> = {
    handle: jest.fn().mockResolvedValue({
      statusCode: 200,
      body: {
        _id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'hashed_password'
      }
    })
  };

  const logRepositoryStub: jest.Mocked<ILogErrorRepository> = {
    log: jest.fn().mockResolvedValue(null)
  };

  const sut = new LogControllerDecorator(controllerStub, logRepositoryStub);

  return { sut, controllerStub, logRepositoryStub };
};

describe('LogController Decorator', () => {
  it('Should call controller handle', async () => {
    const { sut } = makeSut();

    const handleSpy = jest.spyOn(sut, 'handle');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        _id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'hashed_password'
      }
    });
  });

  it('Should call LogRepositoryError with correct error if controller returna a server error', async () => {
    const { sut, controllerStub, logRepositoryStub } = makeSut();
    const error = new Error();
    error.stack = 'any_stack';

    const logSpy = jest.spyOn(logRepositoryStub, 'log');

    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(serverError(error));

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    await sut.handle(httpRequest);
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
