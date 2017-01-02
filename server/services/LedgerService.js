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

  getWithdrawals(userId) {
    return this.getEntriesByTxnType(userId, LEDGER_TXN_TYPES.WITHDRAWAL);
  }

  getEntriesByTxnType(userId, txnType) {
    return this.model.findAll({ where: { userId, type: txnType }});
  }

  userDeposit(userId, amount, currency = CURRENCY.BTC) {
    assert(typeof userId === 'number');
    assert(typeof amount === 'number');

    return this.model.findOne({ where: { userId, currency }, order: 'id DESC'})
      .then((lastEntry) => {
        let balanceBefore = 0;
        if (lastEntry) {
          balanceBefore = parseInt(lastEntry.balanceAfter);
        }

        const balanceAfter = parseInt(balanceBefore) + convertDepositToInteger(amount);

        // Convert based on currency
        const deposit = {
          userId,
          amount: parseInt(amount),
          balanceBefore,
          balanceAfter,
          currency,
          type: LEDGER_TXN_TYPES.DEPOSIT
        };

        return this.model.create(deposit);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  userWithdrawal(userId, withdrawalAmount, txnId, currency = CURRENCY.BTC) {
    return this.getUsersLastEntryByCurrency(userId, currency)
      .then((lastEntry) => {
        assert(withdrawalAmount <= lastEntry.balanceAfter);

        const withdrawal = {
          userId,
          amount: withdrawalAmount,
          txnId,
          currency,
          type: LEDGER_TXN_TYPES.WITHDRAWAL
        };
        return this.model.create(withdrawal);
      });
  }

  userTransfer(fromUserId, toUserId, transferAmount, currency = CURRENCY.BTC) {
    return this.getUsersLastEntryByCurrency(fromUserId, currency)
      .then((lastEntry) => {
        assert(transferAmount <= lastEntry.balanceAfter);

        const transferFrom = {
          userId: fromUserId,
          amount: transferAmount,
          currency,
          type: LEDGER_TXN_TYPES.TRANSFER
        };

        const transferTo = {
          userId: toUserId,
          amount: transferAmount,
          currency,
          type: LEDGER_TXN_TYPES.TRANSFER
        };

        return this.model.create(transferFrom)
          .then(() => {
            return this.model.create(transferTo);
          });
      });
  }

  processWithdrawals(userToAmounts) {
    Object.keys(userToAmounts).forEach((userId) => {
      const txnId = userToAmounts[userId].txnId;
      const amount = userToAmounts[userId].amount;

      this.model.find({ where: { userId, txnId } })
        .then((foundTxn) => {
          if(!foundTxn) {
            const currency = CURRENCY.BTC;
            return this.getUserBalanceByCurrency(userId, currency)
              .then((usersLastLedgerEntry) => {
                const currentBalance = usersLastLedgerEntry ? usersLastLedgerEntry.balanceAfter : 0;
                return this.model.create({
                  userId,
                  txnId,
                  currency,
                  amount,
                  balanceBefore: currentBalance,
                  balanceAfter: currentBalance + amount,
                  type: LEDGER_TXN_TYPES.DEPOSIT
                }, { omitNull: true });
              });
          }
        });
    });
  }
}

export default LedgerService;

function convertDepositToInteger(amount) {
  return parseInt(amount);
}