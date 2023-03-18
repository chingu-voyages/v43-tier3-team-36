import { NextFunction, Request, Response } from "express";
import passport from "passport";

export function authPassportLocal(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', function(err:any, user:any, info:any) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ success : false, message : info.message });
    }
    req.login(user, err => {
      if (err) {
        return next(err);
      }
      return res.json({ success : true, message : info.message });
    });
  })(req, res, next);
}