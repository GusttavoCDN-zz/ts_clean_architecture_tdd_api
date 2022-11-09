import { IController } from '../../presentation/contracts';
import { LogControllerDecorator } from './log';

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: jest.Mocked<IController>
}

const makeSut = (): SutTypes => {
  const controllerStub: jest.Mocked<IController> = {
    handle: jest.fn().mockResolvedValueOnce({
      statusCode: 200,
      body: {
        _id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'hashed_password'
      }
    })
  };

  const sut = new LogControllerDecorator(controllerStub);

  return { sut, controllerStub };
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
});
