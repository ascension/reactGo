import axios from 'axios';

const service = {
    getWithdrawals: () => axios.get('/api/withdrawal'),
    getWithdrawal: (withdrawalId) => axios.get('/api/withdrawal/' + withdrawalId)
  };

export default service;

