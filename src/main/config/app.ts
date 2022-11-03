import express from 'express';
import routes from './routes';
import setupMiddlewares from './middlewares';

const app = express();

setupMiddlewares(app);
routes(app);

export default app;
