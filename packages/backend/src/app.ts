/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import Pusher from 'pusher';
import API from './routes';
import usePassportLocal from './utils/passportLocal';

dotenv.config();

const app = express();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? process.env.DEV_ORIGIN
        : process.env.PROD_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }),
);

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_APP_KEY || '',
  secret: process.env.PUSHER_APP_SECRET || '',
  cluster: process.env.PUSHER_APP_CLUSTER || '',
  useTLS: true,
});

export { pusher };

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
usePassportLocal(passport);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.send('Health is ok!');
});

app.use('/api', API);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      return response.status(400).json({
        error: error.message,
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: 'Internal Server Error',
    });
  },
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
