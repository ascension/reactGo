import { LEDGER_TXN_TYPES, CURRENCY } from '../config/constants';
import Models from '../db/sequelize/models';
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
}