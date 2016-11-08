import React from 'react';
import { connect } from 'react-redux';
import { nextGameState } from '../../../actions/gameStateActions';
import { nextStage } from '../../../actions/stageActions';
import ranks from '../../../ranks.json';

const mapDispatchToProps = dispatch => ({
  nextState: (index) => { dispatch(nextGameState(index)); },
  nextStage: () => { dispatch(nextStage()); },
});

const mapStateToProps = state => ({
  gameState: state.gameState,
});

const Game = ({ gameState, nextState, nextStage }) => (
  <div>
    <p className="game__age">{ gameState.age }</p>
    <p className="game__year">{ gameState.year }</p>
    <p className="game__year">
      {
        gameState.rank
          ? ranks.find(rank => rank.id === gameState.rank).text
          : 'Без ранга'
      }
    </p>
    <p className="game__text">{ gameState.text }</p>
    <p className="game__options">
      {
        gameState.options &&
        gameState.options.map(({ text }, index) =>
          <button key={index} onClick={() => nextState(index)}>
            { text || 'Дальше' }
          </button>
        )
      }

      {
        gameState.final &&
        <button onClick={() => nextStage()}>
          { 'Конец' }
        </button>
      }
    </p>
  </div>
);

const { func, shape, string, array } = React.PropTypes;

Game.propTypes = {
  nextState: func.isRequired,
  nextStage: func.isRequired,
  gameState: shape({
    text: string.isRequired,
    options: array,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
