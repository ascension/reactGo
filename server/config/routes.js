/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const accountsController = controllers && controllers.accounts;
const topicsController = controllers && controllers.topics;
const gamesController = controllers && controllers.games;
const messagesController = controllers && controllers.messages;
const ledgerController = controllers && controllers.ledger;

function isAuthenticatedApi(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.status(401);
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/login');
}

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/api/withdrawal', isAuthenticatedApi, usersController.withdraw);
    app.get('/api/withdrawal', isAuthenticatedApi, usersController.getWithdrawals);
    app.get('/api/ledger/:txnType', isAuthenticatedApi, ledgerController.get);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  // game routes
  if (gamesController) {
    app.get('/api/game', gamesController.all);
    app.get('/api/game/:id', gamesController.one);
    app.post('/api/game', isAuthenticatedApi, gamesController.add);
    app.post('/api/game/:id/join', isAuthenticatedApi, gamesController.join);
    app.put('/api/game/:id', isAuthenticatedApi, gamesController.update);
  }

  // account routes
  if (gamesController) {
    app.get('/api/game', gamesController.all);
    app.get('/api/game/:id', gamesController.one);
    app.post('/api/game', isAuthenticatedApi, gamesController.add);
    app.post('/api/game/:id/join', isAuthenticatedApi, gamesController.join);
    app.put('/api/game/:id', isAuthenticatedApi, gamesController.update);
  }

  // message routes
  if (messagesController) {
    app.get('/message/:channel', messagesController.all);
    app.post('/message', isAuthenticatedApi, messagesController.add);
  }
};
