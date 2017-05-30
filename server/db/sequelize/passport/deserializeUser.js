import Models from '../models';

const User = Models.User;
const Ledger = Models.Ledger;

export default (id, done) => {
  User.findById(id, { include: [{ model: Ledger }] }).then((user) => {
    done(null, user);
  }).catch(done);
};
