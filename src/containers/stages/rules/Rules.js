import React from 'react';
import { connect } from 'react-redux';
import { nextStage } from '../../../actions/stageActions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(nextStage()); },
});

const Rules = ({ action }) => (
  <div className="xx-article">
    <div className="xx-container">
      <a href="" className="xx-chapter">Петр I. Модернизация</a>
      <div className="xx-title">Жизнь дворянина.<br/>Табель о рангах</div>
      <div
        className="xx-lead"
        dangerouslySetInnerHTML={{__html: "Табель о&nbsp;рангах, возможность получить дворянство по&nbsp;выслуге&nbsp;— и&nbsp;как к&nbsp;этому относились древние дворянские роды" }}
      />
      <a className="xx-btn xx-btn--small" href="http://arzamas.academy/materials/1142" target="_blank">Для учителя</a>
      <div className="xx-rules">
        <div className="xx-rules__header">Путь русского дворянина:</div>
        <div
          className="xx-rules__list"
          dangerouslySetInnerHTML={{__html: "В&nbsp;ваших руках судьба и&nbsp;карьера русского дворянина. Вы&nbsp;можете провести его через волнения, дворцовые перевороты и&nbsp;войны XVIII века и&nbsp;довести до&nbsp;вершины Табели о&nbsp;рангах&nbsp;— а&nbsp;можете отправить его на&nbsp;каторгу или сделать разбойником. Вам нужно выбрать, что случится с&nbsp;героем в&nbsp;той или иной ситуации&nbsp;— и&nbsp;узнать, к&nbsp;чему это приведет." }}
        />
      </div>
      <button className="xx-btn xx-btn--big" onClick={action}>Начать игру</button>
    </div>
  </div>
);

Rules.propTypes = {
  action: React.PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Rules);
