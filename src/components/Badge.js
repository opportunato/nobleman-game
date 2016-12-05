import React from 'react';
import Table, { romanLevels, rankTypeIcons } from './table/Table';

const getBadgeIcon = (rank) => {
  if (!rank) return EmptyBadgeIcon;
  if (!rank.level) return BadgeIcon;
  if (rank.level < 8) {
    return SuperGoldenBadgeIcon;
  } else {
    return GoldenBadgeIcon;
  }
};

const SuperGoldenBadgeIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="158"
    height="162"
    viewBox="0 0 158 182"
  >
    <g>
      <polygon fill="#FFD700" points="7,49.7 7,132.7 79,174.2 151,132.7 151,49.7 79,8.2 	"/>
      <path fill="#FFD700" d="M79,0L0,45.5v91L79,182l79-45.5v-91L79,0z M155,134.8l-76,43.8L3,134.8V47.2L79,3.5l76,43.8V134.8z"/>
    </g>
  </svg>
);

const GoldenBadgeIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="144"
    height="166"
    viewBox="0 0 144 166"
  >
    <polygon fill="#EFD152" points="0,41.5 72,0 144,41.5 144,124.5 72,166 0,124.5 "/>
  </svg>
);

const BadgeIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="144"
    height="166"
    viewBox="0 0 144 166"
  >
    <polygon fill="#CEBCA5" points="0,41.5 72,0 144,41.5 144,124.5 72,166 0,124.5 "/>
  </svg>
);

const EmptyBadgeIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="147"
    height="166"
    viewBox="28 -58 144 166"
  >
    <polygon fill="none" stroke="#CEBCA5" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="0,4.8885,0,0,0,0" points="
	28,-16.5 100,-58 172,-16.5 172,66.5 100,108 28,66.5 "/>
    <line fill="none" stroke="#CEBCA5" strokeMiterlimit="10" x1="76" y1="1" x2="124" y2="49"/>
    <line fill="none" stroke="#CEBCA5" strokeMiterlimit="10" x1="124" y1="1" x2="76" y2="49"/>
  </svg>
);

const Badge = ({ className, currentRank, children }) => {
  const Icon = getBadgeIcon(currentRank);

  return (
    <div className={`${className} xx-badge`}>
      <div className="xx-badge__bg">
        <Icon />
      </div>
      {
        currentRank && currentRank.level &&
        <i className={`xx-icon xx-icon--${rankTypeIcons[currentRank.type]} xx-badge__icon`}/>
      }
      {
        currentRank && currentRank.level &&
        <div className="xx-badge__title">{romanLevels[currentRank.level]}</div>
      }
      {
        currentRank && currentRank.level &&
        <div className="xx-badge__subtitle">класс</div>
      }
      {
        currentRank && !currentRank.level &&
        <div className="xx-badge__placeholder">Ниже табели о рангах</div>
      }
      { children }
    </div>
  );
};

export default Badge;
