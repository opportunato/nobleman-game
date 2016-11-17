import React from 'react';
import ranks from '../../ranks.json';

export const romanLevels = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
  11: "XI",
  12: "XII",
  13: "XIII",
  14: "XIV"
};

export const rankTypeIcons = {
  citizen: 'pen',
  military: 'cannon',
  court: 'court'
};

const findRanks = (level, type, militaryType=null) =>
  ranks.filter(rank =>
    rank.level === level && rank.type === type && (!militaryType || rank.militaryType === militaryType));

const renderRanks = (ranks, currentRank) => {
  if (ranks.length > 0) {
    return (
      <ul>
        {
          ranks.map((rank, index) => <li key={index} className={(currentRank && currentRank.id === rank.id) ? "xx-text-selected" : ""}>
            <div>{ rank.text }</div>
          </li>)
        }
      </ul>
    )
  } else {
    return "—";
  }
};

const hasRankWithLevel = (level, currentRank) => {
  const foundRank = ranks.find(rank => currentRank && currentRank.id === rank.id);

  return foundRank && foundRank.level === level;
};

const Table = ({ currentRank, onClose }) => (
  <div className="xx-table-container">
    <button className="xx-table-close-btn xx-btn-unstyled" onClick={onClose}>
      <i className="xx-icon xx-icon--cross" />
    </button>
    <div className="xx-table">
      <div className="xx-table__title">Табель о рангах</div>
      <div className="xx-row">
        <div className="xx-row__item xx-row__item--class xx-row__item--title xx-centered">
          <div className="xx-text-inverted">Класс</div>
        </div>
        <div className="xx-row__item xx-row__item--title xx-centered">
          <i className={`xx-icon xx-icon--${rankTypeIcons.citizen}`} />
          <div>Гражданские чины</div>
        </div>
        <div className="xx-row__item xx-row__item--double">
          <div className="xx-row__item--title xx-row--top"><i className={`xx-icon xx-icon--${rankTypeIcons.army} xx-icon--text-after`} />Военные чины</div>
          <div className="xx-row xx-row--bottom">
            <div className="xx-row__item xx-row__item--title">Армия</div>
            <div className="xx-row__item xx-row__item--title">Гвардия</div>
          </div>
        </div>
        <div className="xx-row__item xx-row__item--title xx-centered">
          <i className={`xx-icon xx-icon--${rankTypeIcons.court}`} />
          <div>Придворные чины</div>
        </div>
      </div>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(level =>
          <div key={level} className="xx-row">
            <div className="xx-row__item xx-row__item--class">
              <div className={"xx-row__level" + (hasRankWithLevel(level, currentRank) ? "  xx-row__level--selected" : "")}>{romanLevels[level]}</div>
            </div>
            <div className="xx-row__item">
              {renderRanks(findRanks(level, "citizen"), currentRank)}
            </div>
            <div className="xx-row__item">
              {renderRanks(findRanks(level, "military", "army"), currentRank)}
            </div>
            <div className="xx-row__item">
              {renderRanks(findRanks(level, "military", "guard"), currentRank)}
            </div>
            <div className="xx-row__item">
              {renderRanks(findRanks(level, "court"), currentRank)}
            </div>
          </div>
        )
      }
    </div>
  </div>
);

export default Table;
