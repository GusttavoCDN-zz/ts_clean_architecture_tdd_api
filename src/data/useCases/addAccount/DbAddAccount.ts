import { IAddAccount, IEncrypter, IAddAccountDTO, IAccount } from './db-add-account.contracts';

export class DbAddAccount implements IAddAccount {
  constructor(private readonly _encrypter: IEncrypter) {}

  public async add(account: IAddAccountDTO): Promise<IAccount> {
    const hashedPassword = await this._encrypter.encrypt(account.password);
    console.log(hashedPassword);

    return { id: '', email: '', name: '', password: '' };
  }
}
