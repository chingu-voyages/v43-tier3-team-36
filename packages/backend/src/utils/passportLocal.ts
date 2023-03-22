import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserById, findUserByUsername } from '../services/user.service';
import { comparePassword } from './hashPassword';

const passportLocal = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const findUser = await findUserByUsername({ username });
        if (findUser) {
          if (await comparePassword(password, findUser.password)) {
            return done(null, findUser, { message: 'Login successful' });
          }
          return done(null, false, { message: 'invalid credentials' });
        }
        return done(null, false, { message: 'invalid credential' });
      } catch (error: any) {
        return done(null, false, error);
      }
    }),
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    const user = await findUserById({ id });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
};

export default passportLocal;
