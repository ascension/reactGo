import { connect } from 'react-redux';


function QueryContainer(props) {
  return (

  );
}

const sampleStores = {
  games: 'game.games',
  gamePlays: 'gamePlay.gamePlays',
  user: 'user'
};

export default (Component, stores, actions) => {
  function mapStateToProps(state) {

    Object.keys(stores).forEach((key) => {
      // Check to
      const values = stores[key].split('.');


      state[values[0]][values[1]]

    });

    return {
      games: state.game.games,
      gamePlays: state.gamePlay.gamePlays,
      user: state.user
    };
  }
  return connect(mapStateToProps, { ...actions })(Component)
}

const emailValidationSchema = {
  email: {
    validators: [new EmailIsValid(), new EmailIsUnique()],
  }
}
