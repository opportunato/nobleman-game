import React from 'react';
import { connect } from 'react-redux';
import { nextStage } from '../../../actions/stageActions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(nextStage()); },
});

const Intro = ({ action }) => (
  <div className="xx-article">
    <div className="xx-container">
      <header className="xx-header">
        <a href="" className="xx-chapter xx-header__chapter">Петр I. Модернизация</a>
        <div className="xx-header__title">Жизнь дворянина</div>
      </header>
      <div className="xx-body">
        <aside className="xx-body__sidebar">
          <div className="xx-avatar" />
        </aside>
        <div className="xx-body__content">
          <div className="xx-columns">
            <div className="xx-columns__item">
              <div className="xx-small-title">Персонаж</div>
              <p className="xx-paragraph"><strong>Пётр Алексеевич Хрюшкин</strong></p>
            </div>
            <div className="xx-columns__item">
              <div className="xx-small-title">Год рождения</div>
              <p className="xx-paragraph">1735 или 1736 — <i>сам точно не помнит</i></p>
            </div>
          </div>
          <div className="xx-separator" />
          <div className="xx-space" />
          <div>
            <h3 className="xx-small-title">Происхождение</h3>
            <p className="xx-paragraph">
              «Фамилия наша издревле дворянская; зовется от вкравшегося прозвища одного из предков моих, мужа честного из немецкой земли, но откуда выезжего, не упомню, а именной родословной изыскать не мог. Потомков же моих предостеречь должен от вклепавшихся в фамилию нашу происшедших из церковников, а то и из мужиков подлого звания, кои вошли в приказную службу, по выслуге чины получили, от неправедных прибытков купили деревни, а ныне фальшиво присвояют себе благородное имя потомственных дворян Хрюшкиных»
            </p>
          </div>
          <div className="xx-space" />
          <div className="xx-separator" />
          <div className="xx-columns">
            <div className="xx-columns__item">
              <div className="xx-small-title">Владение</div>
              <p className="xx-paragraph">Сельцо Хрюшкино Муромского уезда Владимирской провинции Московской губернии</p>
            </div>
            <div className="xx-columns__item">
              <h3 className="xx-small-title">Состояние</h3>
              <p className="xx-paragraph">За отцом (капитан в отставке) ни много ни мало — 100 душ</p>
            </div>
          </div>
          <div className="xx-separator" />
          <div className="xx-as_c xx-my_20">
            <button
              className="xx-btn xx-btn--inverted"
              onClick={action}
            >
              Начать жизнь
              <i className="xx-icon xx-icon--arrow xx-icon--text-before" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Intro.propTypes = {
  action: React.PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Intro);
