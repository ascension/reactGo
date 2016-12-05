import { LEDGER_TXN_TYPES, CURRENCY } from './config/constants';
import Models from './db/sequelize/models';
const { Ledger } = Models;
import assert from 'assert';

export default class TransactionService {
  constructor() {

  }

  getUsersLastEntryByCurrency(userId, currency) {
    return Ledger.findOne({ where: { userId, currency }, order: 'id DESC'});
  }

  placeBet(userId, gameId, betAmount, currency) {
    console.log('place bet: ', userId, gameId, betAmount, currency);
    return this.getUsersLastEntryByCurrency(userId, currency)
      .then((lastEntry) => {
        assert(lastEntry);
        const currentBalance = lastEntry.balanceAfter;
        assert(currentBalance >= betAmount, 'Not enough balance.');
        const newBalance = currentBalance - betAmount;
        const bet = {
          userId,
          gameId,
          amount: betAmount,
          balanceBefore: currentBalance,
          balanceAfter: newBalance,
          currency,
          type: LEDGER_TXN_TYPES.BET_PLACED
        };
        return Ledger.create(bet);
      })
  }

  cancelBet(userId, gameId) {
    return Ledger.findOne({ where: { userId, gameId, type: LEDGER_TXN_TYPES.BET_PLACED }, order: 'id DESC'})
      .then((foundBet) => {
        return this.getUsersLastEntryByCurrency(userId, foundBet.currency)
          .then((lastEntry) => {
            const currentBalance = parseInt(lastEntry.balanceAfter);
            const betAmount = parseInt(foundBet.amount);
            const newBalance = currentBalance + betAmount;

            const cancelBetEntry = {
              userId,
              gameId: foundBet.gameId,
              amount: parseInt(betAmount),
              balanceBefore: currentBalance,
              balanceAfter: newBalance,
              currency: foundBet.currency,
              type: LEDGER_TXN_TYPES.BET_CANCELED
            };

            return Ledger.create(cancelBetEntry);
          });
      });
  }

  userDeposit(userId, amount, currency = CURRENCY.BTC) {
    assert(typeof userId === 'number');
    assert(typeof amount === 'number');

    return Ledger.findOne({ where: { userId, currency }, order: 'id DESC'})
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

        return Ledger.create(deposit);
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
        return Ledger.create(withdrawal);
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

        return Ledger.create(transferFrom)
          .then(() => {
            return Ledger.create(transferTo);
          });
      });
  }
}

function convertDepositToInteger(amount) {
  return parseInt(amount);
}