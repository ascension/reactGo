import { userService } from '../services';
import { normalize, arrayOf } from 'normalizr';
import ledgerSchema from '../schemas/ledgerSchema';

export const fetchWithdrawalData = () => {
  return userService.getWithdrawals()
    .then(res => {
      const normalized = normalize(res.data, arrayOf(ledgerSchema));
      return normalized;
    });
};

export const fetchDepositData = () => {
  return userService.getDeposits((res) => {
    const normalized = normalize(res.data, arrayOf(ledgerSchema));
    return normalized;
  })
};
