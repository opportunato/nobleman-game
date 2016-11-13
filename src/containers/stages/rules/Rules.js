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
      <h1 className="xx-title">Жизнь дворянина.<br/>Табель о рангах</h1>
      <p className="xx-lead">Табель о рангах, возможность получить дворянство по выслуге — и как к этому относились древние дворянские роды</p>
      <a className="xx-btn xx-btn--small" href="http://arzamas.academy/materials/1142" target="_blank">Для учителя</a>
      <div className="xx-rules">
        <h2 className="xx-rules__header">Правила игры:</h2>
        <ul className="xx-rules__list">
          <li className="xx-rules__item">Разглядывайте картины, ищите или считайте детали них и отвечайте на вопросы. Чем больше правильных ответов, тем лучше</li>
          <li className="xx-rules__item">Не торопитесь, времени достаточно — 120 секунд. Зато каждый неправильный ответ лишит вас 30 секунд — будьте аккуратней с кликами!</li>
          <li className="xx-rules__item">Разглядывайте картины, ищите или считайте детали них и отвечайте на вопросы. Чем больше правильных ответов, тем лучше</li>
          <li className="xx-rules__item">Не торопитесь, времени достаточно — 120 секунд. Зато каждый неправильный ответ лишит вас 30 секунд — будьте аккуратней с кликами!</li>
        </ul>
      </div>
      <button className="xx-btn" onClick={action}>Начать игру</button>
    </div>
  </div>
);

Rules.propTypes = {
  action: React.PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Rules);
