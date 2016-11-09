import _ from 'lodash';
import Models from '../models';
const Game = Models.Game;
const sequelize = Models.sequelize;
import { GAME_TYPES } from '../../../config/constants';

/**
 * List
 */
export function all(req, res) {
  Game.findAll().then((topics) => {
    res.json(topics);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

/**
 * Add a Game
 */
export function add(req, res) {
  const newGame = Object.assign({}, req.body, { userId: req.session.passport.user, gameType: GAME_TYPES.COIN_FLIP});
  return Game.create(newGame).then((createdGame) => {
    res.status(200).send(createdGame);
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
}

/**
 * Update a Game
 */
export function update(req, res) {
  const query = { id: req.params.id };
  const isIncrement = req.body.isIncrement;
  const isFull = req.body.isFull;
  const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);

  if (isFull) {
    Game.update(data, { where: query }).then(() => {
      res.status(200).send('Updated successfully');
    }).catch((err) => {
      console.log(err);
      res.status(500).send('We failed to save for some reason');
    });
  } else {
    const sign = isIncrement ? '+' : '-';
    Game.update({
      count: sequelize.literal(`count${sign}1`)
    }, { where: query }).then(() => {
      res.status(200).send('Updated successfully');
    }).catch((err) => {
      console.log(err);
      // Not sure if server status is the correct status to return
      res.status(500).send('We failed to save for some reason');
    });
  }
}

export default {
  all,
  add,
  update
};
