import { Application } from 'express';
import { bodyParser } from '../middlewares/body-parser';
import { contentType } from '../middlewares/content-type';
import { corsMiddleware } from '../middlewares/cors';

export default (app: Application): void => {
  app.use(bodyParser);
  app.use(corsMiddleware);
  app.use(contentType);
};
