import { NextFunction, Request, Response } from 'express';
import { User, UserPartial } from '../schemas';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
