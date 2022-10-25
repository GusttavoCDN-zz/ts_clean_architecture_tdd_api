import { IEncrypter } from '../../data/contracts/IEncrypter';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements IEncrypter {
  constructor(private readonly _salt: number) {}

  public async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this._salt);
    return hash;
  }
}
