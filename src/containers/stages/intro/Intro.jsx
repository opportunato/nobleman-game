import React from 'react';
import { connect } from 'react-redux';
import { nextStage } from '../../../actions/stageActions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(nextStage()); },
});

const Intro = ({ action }) => (
  <div>
    <p>Здесь будет текст про Хрюшкина</p>
    <button onClick={action}>Начать жизнь</button>
  </div>
);

Intro.propTypes = {
  action: React.PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Intro);
