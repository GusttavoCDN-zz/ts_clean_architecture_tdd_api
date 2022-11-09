import request from 'supertest';
import { MongoHelper } from '../../infra/databases/mongodb/helpers/mongo.helper';
import app from '../config/app';

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  it('Should return an account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Gustavo',
        email: 'gustavo.santos@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200);
  });
});
