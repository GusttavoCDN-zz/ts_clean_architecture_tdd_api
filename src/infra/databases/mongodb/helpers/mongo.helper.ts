import { MongoClient, MongoClientOptions } from 'mongodb';

interface CustomMongoClientOptions extends MongoClientOptions {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

export const MongoHelper = {
  client: null as unknown as MongoClient | null,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as CustomMongoClientOptions);
  },

  async disconnect(): Promise<void> {
    await this.client?.close();
    this.client = null;
  }
};
