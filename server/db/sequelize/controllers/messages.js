import _ from 'lodash';
import Models from '../models';
const Message = Models.Message;
const sequelize = Models.sequelize;

/**
 * List
 */
export function all(req, res) {
  Message.findAll().then((messages) => {
    res.json(messages);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

/**
 * Add a Message
 */
export function add(req, res) {
  const newGame = Object.assign({}, req.body, {
    userId: req.session.passport.user
  });
  return Game.create(newGame).then((newMessage) => {
      res.status(200).send(newMessage);
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
}

export default {
  all,
  add
};
