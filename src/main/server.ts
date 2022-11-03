import app from './config/app';
import { MongoHelper } from '../infra/databases/mongodb/helpers/mongo.helper';
import env from './config/env';

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    console.log(env);
    app.listen(env.port, () => console.log(`Listening on port ${env.port}...`));
  })
  .catch(console.error);
