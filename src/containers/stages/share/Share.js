import React from 'react';
import { connect } from 'react-redux';
import { restart } from '../../../actions/stageActions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(restart()); },
});

const mapStateToProps = state => ({
  gameState: state.gameState,
});

const shareLink = 'http://arzamas.academy/results/1200';

const texts = {
  1: "Я помог русскому дворянину прожить ничем не примечательную скучную жизнь",
  2: "Я довел русского дворянина до каторги и преждевременной смерти",
  3: "Я помог русскому дворянину стать героем войны и счастливым семьянином",
  4: "Я помог русскому дворянину разбогатеть, но не достигнуть карьерных высот",
  5: "Я преждевременно оборвал жизнь и карьеру русского дворянина",
  6: "Я помог русскому дворянину стать прославленным военачальником",
  7: "Я возвел русского дворянина на вершину придворной карьеры"
};

const Share = ({ gameState, action }) => (
  <div className="xx-article xx-article--inverted">
    <div className="xx-container">
      <header className="xx-header">
        <a href="" className="xx-chapter xx-header__chapter">Петр I. Модернизация</a>
        <div className="xx-header__title">Жизнь дворянина</div>
      </header>
      <div className="xx-result">
        <div className="xx-result__img">
          <img src={`https://s3.eu-central-1.amazonaws.com/arzamas-static/x/334-school-w9gxEU0N22MfiGAcrMoZs7TAa3/1200/stones/stone${gameState.resultId}.jpg`} />
        </div>
        <div className="xx-result__info">
          <div className="xx-result__text">
            {texts[gameState.resultId]}
          </div>

          <div className="xx-result__separator xx-separator"></div>

          <div className="xx-share">
            <div className="xx-share__title">
              Поделиться в соцсети:
            </div>
            <ul className="xx-share__list">
              <li className="social social-vk">
                <a href="" title="Поделиться в VK" />
              </li>
              <li className="social social-fb">
                <a href="" title="Поделиться в Facebook" />
              </li>
              <li className="social social-od">
                <a href="" />
              </li>
              <li className="social social-tw">
                <a href={`https://twitter.com/intent/tweet?text=${texts[gameState.resultId]}&original_referer=${shareLink}&url=${shareLink}`} title="Поделиться в Twitter" />
              </li>
            </ul>
          </div>

          <button className="xx-btn xx-btn--inverted xx-result__replay" onClick={action}>
            Сыграть еще раз
          </button>
        </div>

      </div>
    </div>
  </div>
);

const { func, shape, string } = React.PropTypes;

Share.propTypes = {
  action: func.isRequired,
  gameState: shape({
    text: string.isRequired,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
