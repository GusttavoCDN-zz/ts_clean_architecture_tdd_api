import { MongoHelper } from '../infra/databases/mongodb/helpers/mongo.helper';
import env from './config/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () => console.log(`Listening on port ${env.port}...`));
  })
  .catch(console.error);
