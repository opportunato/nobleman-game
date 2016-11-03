import React from 'react';
import { connect } from 'react-redux';
import { restart } from '../../../actions/stageActions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(restart()); },
});

const Share = ({ action }) => (
  <div>
    <p>Здесь будут шары</p>
    <button onClick={action}>Сыграть еще раз</button>
  </div>
);

Share.propTypes = {
  action: React.PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Share);
