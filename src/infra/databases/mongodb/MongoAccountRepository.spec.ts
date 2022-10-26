import { MongoHelper } from './helpers/mongo.helper';
import { MongoAccountRepository } from './MongoAccountRepository';

describe('MongoAccount Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('Should return an account on sucess', async () => {
    const sut = new MongoAccountRepository();

    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password'
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@gmail.com');
    expect(account.password).toBe('any_password');
  });
});
