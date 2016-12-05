import React from 'react';
import Modal from './modal/Modal';
import Loading from './Loading';
import Badge from './Badge';

const LevelNotification = ({ onClose, isLoading, currentRank, transitionText }) => (
  <Modal>
    <div className="xx-level">
      {
        isLoading &&
        <div className="xx-level__loading">
          <Loading />
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
          <div className="xx-level__rank">
            {currentRank ? (currentRank.displayText || currentRank.text) : "Без ранга"}
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
      }
    </div>

  </Modal>
);

export default LevelNotification;
