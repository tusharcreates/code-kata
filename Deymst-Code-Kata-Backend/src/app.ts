import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import upload from 'express-fileupload';
import path from 'path';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(
      cors({
        origin: [
          'http://localhost:8080',
          'http://localhost:3000',
          'http://127.0.0.1:8080',
          'http://127.0.0.1:3000',
          'https://thefuture.university',
          'https://www.thefuture.university',
          'https://bootcampx.in',
          'https://www.bootcampx.in',
          'https://admin.thefuture.university',
          'https://www.thefutureuniversity.co',
          'https://thefutureuniversity.co',
          'https://www.test-admin.thefuture.university',
          'https://test-admin.thefuture.university',
          'https://test.thefuture.university',
          'https://www.test.thefuture.university',
        ],
        credentials: true,
      }),
    );
    this.app.use(upload());
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.set('view engine', 'pug');
    this.app.set('views', path.join(__dirname, '../src/views'));
    this.app.use(express.raw({ type: 'application/webhook+json' }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
