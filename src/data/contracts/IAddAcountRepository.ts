import { IAccount } from '../../domain/entities/Account';
import { IAddAccountDTO } from '../../domain/useCases/addAccount';

export interface IAddAccountRepository {
  add: (account: IAddAccountDTO) => Promise<IAccount>
}
