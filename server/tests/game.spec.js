import expect from 'expect';
import Game from 'server/Game.es6';

describe('Game', () => {
  it('should return the initial state', () => {
    var game = new Game();
    expect.toBeDefined(game);
  });
});
