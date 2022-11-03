import { Application } from 'express';
import { bodyParser, contentType, corsMiddleware } from '../middlewares';

export default (app: Application): void => {
  app.use(bodyParser);
  app.use(corsMiddleware);
  app.use(contentType);
};
