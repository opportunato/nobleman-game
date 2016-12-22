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
              <div className="xx-paragraph"><strong>Пётр Алексеевич Хрюшкин</strong></div>
            </div>
            <div className="xx-columns__item">
              <div className="xx-small-title">Год рождения</div>
              <div className="xx-paragraph">1735</div>
            </div>
          </div>
          <div className="xx-separator" />
          <div className="xx-space" />
          <div>
            <div className="xx-small-title">Происхождение</div>
            <div
              className="xx-paragraph"
              dangerouslySetInnerHTML={{
                __html: "<span style=\"margin-left:-0.20em;\">&laquo;</span>Фамилия наша издревле дворянская; зовется от&nbsp;вкравшегося прозвища одного из&nbsp;предков моих, мужа честного из&nbsp;немецкой земли, но&nbsp;откуда выезжего, не&nbsp;упомню, а&nbsp;именной родословной изыскать не&nbsp;мог. Потомков&nbsp;же моих предостеречь должен от&nbsp;вклепавшихся в&nbsp;фамилию нашу происшедших из&nbsp;церковников, а&nbsp;то и&nbsp;из&nbsp;мужиков подлого звания, кои вошли в&nbsp;приказную службу, по&nbsp;выслуге чины получили, от&nbsp;неправедных прибытков купили деревни, а&nbsp;ныне фальшиво присвояют себе благородное имя потомственных дворян Хрюшкиных&raquo;"
              }}
            >
            </div>
          </div>
          <div className="xx-space" />
          <div className="xx-separator" />
          <div className="xx-columns">
            <div className="xx-columns__item">
              <div className="xx-small-title">Владение</div>
              <div className="xx-paragraph">Сельцо Хрюшкино Муромского уезда Владимирской провинции Московской губернии</div>
            </div>
            <div className="xx-columns__item">
              <div className="xx-small-title">Состояние</div>
              <div className="xx-paragraph">За отцом (капитан в отставке) ни много ни мало — 100 душ</div>
            </div>
          </div>
          <div className="xx-separator" />
          <div className="xx-as_c xx-my_20">
            <button
              className="xx-btn xx-btn--big xx-btn--inverted"
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
