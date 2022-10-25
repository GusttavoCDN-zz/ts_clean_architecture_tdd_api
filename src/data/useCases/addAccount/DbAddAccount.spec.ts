import { IEncrypter } from './db-add-account.contracts';
import { DbAddAccount } from './DbAddAccount';

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: jest.Mocked<IEncrypter>
}

const makeSut = (): SutTypes => {
  const encrypterStub: jest.Mocked<IEncrypter> = {
    encrypt: jest.fn().mockResolvedValue('hashed_password')
  };

  const sut = new DbAddAccount(encrypterStub);

  return { sut, encrypterStub };
}

describe('DbAddAccount UseCase', () => {
  it('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const account = { name: 'valid_name', email: 'valid_email', password: 'valid_password' };

    await sut.add(account);
    expect(encryptSpy).toHaveBeenCalledWith(account.password);
  });

  it('Should throw a exception if Encrypt throws', async () => {
    const { encrypterStub, sut } = makeSut();

    encrypterStub.encrypt.mockRejectedValueOnce(new Error());

    const account = { name: 'valid_name', email: 'valid_email', password: 'valid_password' };

    const promise = sut.add(account);

    await expect(promise).rejects.toThrow();
  });
});
