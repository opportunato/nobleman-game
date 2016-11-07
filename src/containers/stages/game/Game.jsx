import React from 'react';
import { connect } from 'react-redux';
import { nextGameState } from '../../../actions/gameStateActions';

const mapDispatchToProps = dispatch => ({
  nextState: (index) => { dispatch(nextGameState(index)); },
});

const mapStateToProps = state => ({
  gameState: state.gameState,
});

const Game = ({ gameState, nextState }) => (
  <div>
    <p>{ gameState.text }</p>
    {
        gameState.options.map(({ text }, index) =>
          <button key={index} onClick={() => nextState(index)}>
            {text}
          </button>
        )
    }

  </div>
);

const { func, shape, string, arrayOf } = React.PropTypes;

Game.propTypes = {
  nextState: func.isRequired,
  gameState: shape({
    text: string.isRequired,
    options: arrayOf(shape({
      text: string.isRequired,
    })),
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
