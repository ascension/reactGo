import passport from 'passport';
import Models from '../models';
const User = Models.User;
import { LEDGER_TXN_TYPES, CURRENCY } from '../../../config/constants';
import { deriveAddress } from '../../../utils/bitcoin';
import LedgerService from '../../../services/LedgerService';
import { Address } from 'bitcore-lib';
const ledgerService = new LedgerService();

const INVALID_WITHDRAWAL_ADDRESS_ERROR_MSG = 'Not a valid destination address';
const INCORRECT_PASSWORD_ERROR_MSG = 'Incorrect password, please try again....';
const WITHDRAWAL_ERROR_MSG = 'An error occurred while processing your withdrawal. Please try again.';

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
        user: user.toJSON()
      });
    });
  })(req, res, next);
}

function apiErrorResponse(res, message, statusCode = 404, errorCode = null) {
  const resp = {
    message
  };

  if (errorCode) resp['error_code'] = errorCode;

  return res.status(statusCode).json(resp);
}

/**
 * POST /withdraw
 */

export function withdraw(req, res) {
  User.findOne({ where: { id: req.user.id } }).then((user) => {
    if (!user) {
      console.error('User is not logged in or found when trying to withdrawal');
      return apiErrorResponse(res, WITHDRAWAL_ERROR_MSG);
    }
    const { amount, withdrawalAddress } = req.body;

    // Validate withdrawal address with bitcoin.Address
    if (!withdrawalAddress && !Address.isValid(withdrawalAddress)) {
      return apiErrorResponse(res, INVALID_WITHDRAWAL_ADDRESS_ERROR_MSG, 404)
    }

    return user.comparePassword(req.body.password).then((passwordResult) => {
      console.log('Withdraw Password Result: ', passwordResult);
      return ledgerService.withdrawFunds(req.user.id, CURRENCY.BTC, amount, withdrawalAddress)
        .then((withdrawSuccess) => {
          console.log('Withdrawal Success: ', withdrawSuccess);
          return res.status(200).json({
            txnId: '123-123-123'
          });
        })
        .catch((withdrawalError) => {
          console.log('Withdrawal Error: ', withdrawalError);
          return apiErrorResponse(res, withdrawalError.message, 404, withdrawalError.errorCode)
        });
    })
      .catch((error) => {
        console.log('Withdrawal Error: ', error);
        return apiErrorResponse(res, INCORRECT_PASSWORD_ERROR_MSG, 404);
      })
  }).catch((err) => {
    console.log(err);
    return apiErrorResponse(res, WITHDRAWAL_ERROR_MSG);
  });
}

/**
 * GET /withdrawal
 */
export function getWithdrawals(req, res) {
  ledgerService.getWithdrawals(req.user.id)
    .then((withdrawals) => {
      if(withdrawals === null) {
        return res.status(200).json([]);
      }
      return res.status(200).json(withdrawals);
    })
    .catch((error) => {
      return apiErrorResponse(res, 'Error getting user withdrawals.')
    });
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
      return apiErrorResponse(res, 'That username is already taken.', 409);
    }

    const user = User.build({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });



    return user.save({ omitNull: true }).then(() => {
      req.logIn(user, (err) => {
        if (err) return apiErrorResponse(res, err, 401);
        return res.status(200).json({
          message: 'You have been successfully logged in.',
          user: user.toJSON()
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
  withdraw,
  getWithdrawals,
  signUp
};
