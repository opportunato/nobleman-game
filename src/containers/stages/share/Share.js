import React from 'react';
import ShareButtons from '../../../components/ShareButtons';
import { connect } from 'react-redux';
import { restart } from '../../../actions/stageActions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(restart()); },
});

const mapStateToProps = state => ({
  gameState: state.gameState,
});

const shareLink = 'http://arzamas.academy/results/1200';

export const TEXTS = {
  1: "Я помог русскому дворянину прожить интересную жизнь, но не достичь высот",
  2: "Я довел русского дворянина до каторги и преждевременной смерти",
  3: "Я помог русскому дворянину стать героем войны и счастливым семьянином",
  4: "Я помог русскому дворянину разбогатеть, но не прославиться",
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
            {TEXTS[gameState.resultId]}
          </div>

          <div className="xx-result__separator xx-separator"></div>

          <ShareButtons
            shareLink = {shareLink}
            text = {TEXTS[gameState.resultId]}
            imgId = "share-photo"
          />

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
