import { ILogErrorRepository } from '../../../data/contracts/ILogErrorRepository';
import { MongoHelper } from '../mongodb/helpers/mongo.helper';

export class MongoLogRepository implements ILogErrorRepository {
  public async log(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');

    await errorCollection.insertOne({
      stack,
      date: new Date()
    });
  }
}
