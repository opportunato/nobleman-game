import React from 'react';
import Modal from './modal/Modal';
import Badge from './Badge';

const LevelNotification = ({ onClose, isLoading, currentRank, transitionText }) => (
  <Modal>
    <div className="xx-level">
      {
        isLoading &&
        <div className="xx-level__loading">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="144"
            height="166"
	          viewBox="1044.5 -28.5 144 166"
          >
            <polygon fill="#1A1A1A" points="1046,14.5 1118,-27 1190,14.5 1190,97.5 1118,139 1046,97.5 "/>
            <rect x="1117" y="6" fill="#FFFFFF" width="2" height="50"/>
            <rect x="1118" y="55" fill="#FFFFFF" width="35" height="2" />
          </svg>
        </div>
      }
      {
        !isLoading &&
        <div className="xx-level__body">
          <div className="xx-level__title">{transitionText}</div>
          <Badge
            className="xx-level__badge"
            currentRank={currentRank}
          />
          <div className="xx-level__bottom">
            <div className="xx-level__rank">
              {currentRank ? currentRank.text : "Без ранга"}
            </div>
            <ul className="xx-level__rank-types">
              <li className={(currentRank && currentRank.type === 'citizen') ? 'xx-level__rank-type-selected' : ''}>Гражданский</li>
              <li className={(currentRank && currentRank.type === 'military') ? 'xx-level__rank-type-selected' : ''}>Военный</li>
              <li className={(currentRank && currentRank.type === 'court') ? 'xx-level__rank-type-selected' : ''}>Придворный</li>
            </ul>
            <div className="xx-level__separator xx-separator" />
            <button
              className="xx-btn xx-btn--inverted xx-options__button"
              onClick={() => onClose()}
            >
              <i className="xx-icon xx-icon--arrow" />
            </button>
          </div>
        </div>
      }
    </div>

  </Modal>
);

export default LevelNotification;
