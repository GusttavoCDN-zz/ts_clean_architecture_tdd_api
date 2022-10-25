import {
  IAddAccount,
  IEncrypter,
  IAddAccountDTO,
  IAccount,
  IAddAccountRepository
} from './db-add-account.contracts';

export class DbAddAccount implements IAddAccount {
  constructor(
    private readonly _encrypter: IEncrypter,
    private readonly _addAccountRepository: IAddAccountRepository
  ) {}

  public async add(account: IAddAccountDTO): Promise<IAccount> {
    const hashedPassword = await this._encrypter.encrypt(account.password);

    const newAccount = await this._addAccountRepository.add({
      ...account,
      password: hashedPassword
    });

    return newAccount;
  }
}
