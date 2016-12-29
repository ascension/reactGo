import { userService } from '../services';
import { normalize, arrayOf } from 'normalizr';
import gameSchema from '../schemas/gameSchema';

export const fetchWithdrawalData = () => {
  return userService.getWithdrawals()
    .then(res => {
      console.log('getWithdrawals: ', res.data);
      return res.data;
    });
};
