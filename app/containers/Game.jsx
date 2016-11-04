import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { createGame, joinGame } from 'actions/game';
import styles from 'css/components/game';

const cx = classNames.bind(styles);

class Game extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { newGame, games, createGame, joinGame } = this.props;
    return (
      <div className={cx('gameTable')}>
        <div>
          <button onClick={createGame}>Create Game</button>
        </div>
        <div>
          <table>
            <th>
              <td>Game</td>
              <td>Status</td>
              <td>Action</td>
            </th>
            {
              games.map((game) => {
               return(
                 <tr>
                  <td>{game.id}</td>
                  <td>{game.status}</td>
                  <td>
                    <button onClick={() => {joinGame(game.id)}}>Join Game</button>
                  </td>
                 </tr>
               )
              })
            }
          </table>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  games: PropTypes.array.isRequired,
  createGame: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    games: state.game.games
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createGame })(Game);
