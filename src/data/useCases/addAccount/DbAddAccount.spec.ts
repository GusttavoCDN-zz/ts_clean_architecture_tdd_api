import { IAddAccountRepository } from '../../contracts/IAddAcountRepository';
import { IEncrypter } from './db-add-account.contracts';
import { DbAddAccount } from './DbAddAccount';

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: jest.Mocked<IEncrypter>
  addAccountStub: jest.Mocked<IAddAccountRepository>
}

const makeSut = (): SutTypes => {
  const addAccountStub: jest.Mocked<IAddAccountRepository> = {
    add: jest.fn().mockResolvedValue({
      id: 'valid_id',
      email: 'valid_email@gmail.com',
      name: 'valid_name',
      password: 'hashed_password'
    })
  };

  const encrypterStub: jest.Mocked<IEncrypter> = {
    encrypt: jest.fn().mockResolvedValue('hashed_password')
  };

  const sut = new DbAddAccount(encrypterStub, addAccountStub);

  return { sut, encrypterStub, addAccountStub };
};

describe('DbAddAccount UseCase', () => {
  it('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    await sut.add(account);
    expect(encryptSpy).toHaveBeenCalledWith(account.password);
  });

  it('Should throw a exception if Encrypt throws', async () => {
    const { encrypterStub, sut } = makeSut();

    encrypterStub.encrypt.mockRejectedValueOnce(new Error());

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    const promise = sut.add(account);

    await expect(promise).rejects.toThrow();
  });

  it('Should call AddAccountRepository with correct data', async () => {
    const { sut, addAccountStub } = makeSut();

    const addAccounttSpy = jest.spyOn(addAccountStub, 'add');

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    await sut.add(account);
    expect(addAccounttSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    });
  });

  it('Should return a newAccount on sucess', async () => {
    const { sut } = makeSut();

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };
    const newAccount = await sut.add(account);
    expect(newAccount).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'hashed_password'
    });
  });
});
