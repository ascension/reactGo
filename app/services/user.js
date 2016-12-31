import axios from 'axios';

const service = {
    getWithdrawals: () => axios.get('/api/ledger/WITHDRAWAL'),
    getDeposits: () => axios.get('/api/ledger/DEPOSIT'),
    getWithdrawal: (withdrawalId) => axios.get('/api/withdrawal/' + withdrawalId)
  };

export default service;

