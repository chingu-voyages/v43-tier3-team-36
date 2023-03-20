import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import API from './routes';

dotenv.config();

// import usePassportLocal from "./utils/passportLocal";

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'anything',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
// usePassportLocal(passport);

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
