import React from 'react';
import { connect } from 'react-redux';
import { nextStage } from '../../../actions/stageActions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(nextStage()); },
});

const Game = ({ action }) => (
  <div>
    <p>Здесь будет сама игра</p>
    <button onClick={action}>Закончить игру</button>
  </div>
);

Game.propTypes = {
  action: React.PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
