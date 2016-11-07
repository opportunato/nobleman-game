import React from 'react';
import { connect } from 'react-redux';
import { STAGE_RULES, STAGE_GAME, STAGE_INTRO, STAGE_SHARE } from '../../reducers/stageReducer';

import Game from '../stages/game/Game';
import Intro from '../stages/intro/Intro';
import Rules from '../stages/rules/Rules';
import Share from '../stages/share/Share';

const mapStateToProps = state => ({
  stage: state.stage,
});

const App = ({ stage }) => (
  <div>
    { stage === STAGE_RULES && <Rules /> }
    { stage === STAGE_INTRO && <Intro /> }
    { stage === STAGE_GAME && <Game /> }
    { stage === STAGE_SHARE && <Share /> }
  </div>
);

App.propTypes = {
  stage: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(App);
