import { LEDGER_TXN_TYPES, CURRENCY } from '../config/constants';
import Models from '../db/sequelize/models';
const { Ledger } = Models;
import assert from 'assert';

const INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS';

class ServiceError extends Error {
  constructor(message, errorCode = null) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.name = 'ServiceError';
  }
}

class LedgerService {
  constructor() {
    this.model = Ledger;
  }
  
  getUserBalanceByCurrency(userId, currency) {
    return this.model.findOne({ where: { userId, currency }, order: 'id DESC'});
  }
  
  withdrawFunds(userId, currency, withdrawalAmount, withdrawalAddress) {
    return this.getUserBalanceByCurrency(userId, currency)
      .then((usersLastLedgerEntry) => {
        if (usersLastLedgerEntry === null) throw new ServiceError('Not enough money to process withdrawal.', INSUFFICIENT_FUNDS);
        const currentBalance = usersLastLedgerEntry.balanceAfter;
        if (!currentBalance >= withdrawalAmount) {
          console.log(`Not enough balance. User: ${userId} requested 
            ${withdrawalAmount} but only has ${currentBalance}`);
          throw new ServiceError('Not enough money to process withdrawal.', INSUFFICIENT_FUNDS);
        }
        const newBalance = currentBalance - withdrawalAmount;
        return this.createWithdrawalEntry(userId, withdrawalAmount, currentBalance, newBalance, currency);
      });
  }

  createWithdrawalEntry(userId, amount, balanceBefore, balanceAfter, currency) {
    const withdrawalEntry = {
      userId,
      amount,
      balanceBefore,
      balanceAfter,
      currency,
      type: LEDGER_TXN_TYPES.BET_PLACED
    };
    return this.model.create(withdrawalEntry);
  }
  
}

export default LedgerService;