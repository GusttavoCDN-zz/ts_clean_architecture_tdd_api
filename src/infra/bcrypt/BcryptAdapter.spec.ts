import { BcryptAdapter } from './BcryptAdapter';
import bcrypt from 'bcrypt'

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with corrrect values', async () => {
    const sut = new BcryptAdapter(12);
    const salt = 12;
    const bcryptSpy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');
    expect(bcryptSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
