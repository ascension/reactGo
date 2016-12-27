import passport from 'passport';
import Models from '../models';
const User = Models.User;
import { deriveAddress } from '../../../utils/bitcoin';

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        message: 'You have been successfully logged in.',
        user: {
          id: user.id,
          bitcoinAddress: deriveAddress(user.id),
          username: user.username
        }
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  User.findOne({ where: { username: req.body.username } }).then((existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: 'That username is already taken.' });
    }

    const user = User.build({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    return user.save().then(() => {
      req.logIn(user, (err) => {
        if (err) return res.status(401).json({ message: err });
        return res.status(200).json({
          message: 'You have been successfully logged in.'
        });
      });
    });
  }).catch((err) =>
    next(err)
  );
}

export default {
  login,
  logout,
  signUp
};
