import passport from 'passport';
import { Ledger } from '../models';
import { LEDGER_TXN_TYPES, CURRENCY } from '../../../config/constants';
import LedgerService from '../../../services/LedgerService';
const ledgerService = new LedgerService();

const INVALID_WITHDRAWAL_ADDRESS_ERROR_MSG = 'Not a valid destination address';
const INCORRECT_PASSWORD_ERROR_MSG = 'Incorrect password, please try again....';
const WITHDRAWAL_ERROR_MSG = 'An error occurred while processing your withdrawal. Please try again.';

/**
 * GET /ledger/
 */
export function get(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({error_msg: 'Unauthorized'});
  }

  const { txnType } = req.params;
  if (!txnType) {
    return res.status(400).json({error_msg: 'Missing required parameter: txnType', error_code: 'missing_parameter'});
  }

  ledgerService.getEntriesByTxnType(req.user.id, txnType)
    .then((ledgerEntries) => {
      if(ledgerEntries === null) {
        return res.status(200).json([]);
      }
      return res.status(200).json(ledgerEntries);
    })
    .catch((error) => {
      return apiErrorResponse(res, 'Error getting user withdrawals.')
    });
}

export default {
  get
};
