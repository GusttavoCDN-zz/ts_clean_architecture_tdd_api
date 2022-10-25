import { IAccount } from '../entities/Account';

export interface IAddAccountDTO {
  name: string
  email: string
  password: string
}

export interface IAddAccount {
  add: (account: IAddAccountDTO) => Promise<IAccount>
}
