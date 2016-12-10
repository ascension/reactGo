import { normalize, Schema, arrayOf } from 'normalizr';
import gamePlay from './gamePlaySchema';
import user from './userSchema';
const game = new Schema('games');

game.define({
  GamePlays: arrayOf(gamePlay),
  User: user
});

export default game;