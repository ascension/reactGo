import _ from 'lodash';
import Models from '../models';
const Game = Models.Game;
const User = Models.User;
const GamePlay = Models.GamePlay;
const sequelize = Models.sequelize;
import { GAME_TYPES, BET_STATES } from '../../../config/constants';

/**
 * List
 */
export function all(req, res) {
  Game.findAll({
    include: [{
      model: GamePlay,
      include: [{ model: User, attributes: ['username', 'id'] }]
    }]
  }).then((games) => {
    res.json(games);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

export function one(req, res) {
  Game.findOne({
    include: [{
      model: GamePlay,
      include: [{ model: User, attributes: ['username', 'id'] }]
    }],
    where: { id: req.params.id }
  }).then((game) => {
    res.json(game);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

/**
 * Add a Game
 */
export function add(req, res) {
  const newGame = Object.assign({}, req.body, {
    userId: req.session.passport.user,
    gameType: GAME_TYPES.COIN_FLIP,
    maxPlayers: 2
  });
  return Game.create(newGame).then((createdGame) => {
    return Game.find({
        where: {
          id: createdGame.id
        },
        include: [{
          model: GamePlay
        }]
      }
    ).then((foundGame) => {
      res.status(200).send(foundGame);
    });
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
}

/**
 * Join a Game
 */

export function join(req, res) {
  return Promise.resolve();
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
  one,
  add,
  join,
  update
};
