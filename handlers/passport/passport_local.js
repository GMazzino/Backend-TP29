import passport from 'passport';
import { Strategy as PassLocalStrategy } from 'passport-local';
import { user } from '../dao/mongoDB_users.js';
import { hashDehash } from '../../utils/pwd_hash.js';

passport.use(
  'register',
  new PassLocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const newUser = req.body?.username;
      const pwd = req.body?.password;
      let pwdHash;
      try {
        pwdHash = await hashDehash({ pwd: pwd, op: 'hash' });
        await user.addUser(newUser, pwdHash);
        return done(null, newUser);
      } catch (err) {
        req.session.messages = [];
        return done(null, false, { message: err.message });
      }
    }
  )
);

passport.use(
  'login',
  new PassLocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      let foundUser;
      let pwdOk = false;
      try {
        foundUser = await user.findUserByName(username);
        if (foundUser?.pwdHash) {
          pwdOk = await hashDehash({
            pwd: password,
            pwdHash: foundUser.pwdHash,
            op: 'dehash',
          });
        }
      } catch (err) {
        req.session.messages = [];
        return done(null, false, { message: err.message });
      }
      if (pwdOk) {
        return done(null, foundUser);
      } else {
        req.session.messages = [];
        return done(null, false, {
          message: 'Usuario o password incorrectos',
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export { passport as passportLocal };
