import React from 'react';
import { connect } from 'react-redux';
import { nextStage } from '../../../actions/stageActions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(nextStage()); },
});

const Rules = ({ action }) => (
  <div>
    <p>Здесь будут правила</p>
    <button onClick={action}>Начать игру</button>
  </div>
);

Rules.propTypes = {
  action: React.PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Rules);
