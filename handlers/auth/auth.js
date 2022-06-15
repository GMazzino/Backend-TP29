let name;

export function webAuth(req, res, next) {
  if (req.isAuthenticated()) {
    name = req.session.passport.user.user;
    next();
  } else {
    res.status(400).redirect('/login');
  }
}
export { name };
