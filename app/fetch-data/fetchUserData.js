import { userService } from '../services';
import { normalize, arrayOf } from 'normalizr';
import ledgerSchema from '../schemas/ledgerSchema';

export const fetchWithdrawalData = () => {
  return userService.getWithdrawals()
    .then(res => {
      return normalize(res.data, arrayOf(ledgerSchema));
    })
    .catch((error) => {
      console.log('fetchWithdrawalData error', error);
      throw error;
    });
};



// export const fetchDepositData = () => {
//   return userService.getDeposits((res) => {
//     const normalized = normalize(res.data, arrayOf(ledgerSchema));
//     return normalized;
//   })
// };
