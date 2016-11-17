import React from 'react';
import Table, { romanLevels, rankTypeIcons } from './table/Table';

const getBadgeType = (rank) => {
  if (!rank) return "empty";
  if (!rank.level) return "out-rank";
  if (rank.level < 8) {
    return "golden";
  } else {
    return "ranked";
  }
};

const Badge = ({ className, currentRank, children }) => (
  <div className={`${className} xx-badge xx-badge--${getBadgeType(currentRank)}`}>
    {
      currentRank && currentRank.type &&
      <i className={`xx-icon xx-icon--${rankTypeIcons[currentRank.type]}`} />
    }
    {
      currentRank && currentRank.level &&
      <div className="xx-badge__title">{romanLevels[currentRank.level]}</div>
    }
    {
      currentRank && currentRank.level &&
      <div className="xx-badge__subtitle">класс</div>
    }
    { children }
  </div>
);

export default Badge;
