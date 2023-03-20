import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserById, findUserByUsername } from '../services/user.service';

const passportLocal = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const findUser: any = await findUserByUsername({ username });
        if (findUser) {
          if (password === findUser.password) {
            return done(null, findUser, { message: 'Login succesful' });
          }
          return done(null, false, {
            message: 'username or password is incorrect',
          });
        }
        return done(null, false, { message: 'username does not exist' });
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
