require('smoothscroll-polyfill').polyfill();

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

class App extends React.Component {

  componentWillUpdate({stage}) {
    if (this.props.stage !== stage) {
      const top = window.pageYOffset + document.querySelector('#xx-game').getBoundingClientRect().top;
      window.scroll({ top, behavior: 'smooth' });
    }
  }

  render() {
    const {stage} = this.props;

    return (
      <div id="xx-game">
        { stage === STAGE_RULES && <Rules /> }
        { stage === STAGE_INTRO && <Intro /> }
        { stage === STAGE_GAME && <Game /> }
        { stage === STAGE_SHARE && <Share /> }
      </div>
    );
  }
}

App.propTypes = {
  stage: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(App);
