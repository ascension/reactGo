import Models from '../models';
import { deriveAddress } from '../../../utils/bitcoin';

const User = Models.User;

export default (id, done) => {
  User.findById(id).then((user) => {
    user.bitcoinAddress = deriveAddress(user.id);
    done(null, user);
  }).catch(done);
};
