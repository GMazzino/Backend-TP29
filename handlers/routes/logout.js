import { cwd as nodePath } from 'node:process';
import { sep } from 'node:path';
import userWsHandler from '../sockets/user.js';

async function closeSession(req, res) {
  const name = req.session.passport.user.user;
  if (req.isAuthenticated()) {
    req.logout((err, done) => {
      if (!err) {
        res.status(200).sendFile(`${nodePath()}${sep}html${sep}logout.html`);
        userWsHandler('logout', req.app.io.sockets, name);
      } else {
        res.status(301).redirect('/');
      }
    });
  }
}

export { closeSession };
