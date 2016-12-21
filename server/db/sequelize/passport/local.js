import Models from '../models';

const User = Models.User;

export default (username, password, done) =>
  User.findOne({ where: { username } }).then((user) => {
    if (!user) return done(null, false, { message: `There is no record of this ${username}.` });
    return user.comparePassword(password).then(
      () => done(null, user),
      () => done(null, false, { message: 'Your username/password combination is incorrect.' })
    );
  }).catch((err) => {
    console.log(err);
    done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
