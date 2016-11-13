import React from 'react';
import { connect } from 'react-redux';
import { restart } from '../../../actions/stageActions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(restart()); },
});

const Share = ({ action }) => (
  <div className="xx-article xx-article--inverted">
    <div className="xx-container">
      <header className="xx-header">
        <a href="" className="xx-chapter xx-header__chapter">Петр I. Модернизация</a>
        <h1 className="xx-header__title">Жизнь дворянина</h1>
      </header>
      <div className="xx-result">
        <div className="xx-result__img">
          <img src="https://s3.eu-central-1.amazonaws.com/arzamas-static/x/334-school-w9gxEU0N22MfiGAcrMoZs7TAa3/1200/share/share-proto.jpg" alt=""/>
        </div>
        <div className="xx-result__info">
          <p className="xx-result__text">
            Холод до сердца проник:<br/>
            На гребень жены покойной<br/>
            В спальне я наступил.<br/>
          </p>

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
                <a href="" />
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

Share.propTypes = {
  action: React.PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Share);
