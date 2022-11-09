import { Collection } from 'mongodb';
import { MongoHelper } from '../mongodb/helpers/mongo.helper';
import { MongoLogRepository } from './MongoLogRepository';

describe('Log Mongo Repository', () => {
  let errorCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  it('Should create an error log on success', async () => {
    const sut = new MongoLogRepository();

    await sut.log('any_error');

    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});
