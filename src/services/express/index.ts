import express, { Application, Router } from 'express';

import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

export default (apiRoot: string, routes: Router): Application => {
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan('dev'));
  app.use(express.json());

  app.use(apiRoot, routes);

  return app;
};
