import { BcryptAdapter } from './BcryptAdapter';
import bcrypt from 'bcrypt';

const makeSut = (): any => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);

  return { sut, salt };
};

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with corrrect values', async () => {
    const { sut, salt } = makeSut();
    const bcryptSpy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');
    expect(bcryptSpy).toHaveBeenCalledWith('any_value', salt);
  });

  it('Should retun a hash on success ', async () => {
    const { sut } = makeSut();

    jest
      .spyOn(bcrypt, 'hash')
      .mockResolvedValueOnce(
        '$2b$12$lC9XWc32ypX7yz8biqtmBucJdCANQopBCof1ahNEzA2n/zb1ecS5y' as never
      );

    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('$2b$12$lC9XWc32ypX7yz8biqtmBucJdCANQopBCof1ahNEzA2n/zb1ecS5y');
  });

  it('Should throws an Error if bcrypt throws ', async () => {
    const { sut } = makeSut();

    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error() as never);

    const promise = sut.encrypt('any_value');
    await expect(promise).rejects.toThrow();
  });
});
