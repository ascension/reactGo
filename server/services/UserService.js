import LedgerService from './LedgerService';

class UserService {
  static getUserBalance() {
    return LedgerService.getUserBalance()
  }
}

export default UserService;