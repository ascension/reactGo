import axios from 'axios';

const service = {
  getMessages: () => axios.get('/message')
};

export default service;

