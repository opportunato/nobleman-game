import React from 'react';
import { connect } from 'react-redux';
import { nextGameState } from '../../../actions/gameStateActions';
import { nextStage } from '../../../actions/stageActions';
import ranks from '../../../ranks.json';
import allNotes from '../../../notes.json';
import Table from '../../../components/table/Table';
import Note from '../../../components/note/Note';
import LevelNotification from '../../../components/LevelNotification';
import Badge from '../../../components/Badge';

const mapDispatchToProps = dispatch => ({
  nextState: (index) => { dispatch(nextGameState(index)); },
  nextStage: () => { dispatch(nextStage()); },
});

const mapStateToProps = state => ({
  gameState: state.gameState,
});

const rankTypes = {
  citizen: "Гражданский чин",
  military: "Военный чин",
  court: "Придворный чин"
};

const openModal = (callback) => {
  document.body.style.overflow = 'hidden';
  callback();
};

const closeModal = (callback) => {
  document.body.style.overflow = 'auto';
  callback();
};

class Notice extends React.Component {
  state = {
    isOpened: false
  };

  render() {
    const {text} = this.props;
    const {isOpened} = this.state;
    return (
      <span className="xx-notice">
        <button
          className={"xx-btn-unstyled xx-notice__button" + (isOpened ? ' xx-notice__button--opened' : "")}
          onClick={() => this.setState({isOpened: !this.state.isOpened})}
        >
          &nbsp;
        </button>
        <span className={"xx-notice__balloon xx-notice__balloon--flipped" + (isOpened ? ' xx-notice__balloon--opened' : "")}>
          {text}
        </span>
      </span>
    );
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTable: false,
      noteId: null,
      showLevelModal: false,
      isLoading: false
    };
  }

  componentWillReceiveProps(newProps) {
    const {gameState:newGameState} = newProps;

    if (newGameState.id !== this.props.gameState.id) {
      if (newGameState.transitionText) {
        this.setState({ isLoading: false });
      } else {
        closeModal(() => {
          this.setState({ showLevelModal: false });
        });
      }
    }
  }

  showLevelModal = (callback) => {
    openModal(() => {
      this.setState({
        showLevelModal: true,
        isLoading: true
      });
      setTimeout(() => {
        callback();
      }, 1000);
    });
  };

  // only works if text has one notice
  convertNotices = (text) => {
    const re = /\[note=(.*)\]/;
    const match = text.match(re);
    if (match) {
      const strings = text.split(re)
      return (
        <div>
          {strings[0]}
          <Notice text={strings[1]} />
          {strings[2]}
        </div>
      )
    }
    return text;
  };

  render() {
    const { gameState: { rank: rankId, year, age, text, final, options, transitionText, notes }, nextState, nextStage } = this.props;
    const currentRank = ranks.find(rank => rank.id === rankId);

    return (
      <div className="xx-article">
        <div className="xx-container">
          <header className="xx-header">
            <a href="" className="xx-chapter xx-header__chapter">
              Петр I. Модернизация
            </a>
            <div className="xx-header__title">
              Жизнь дворянина
            </div>
          </header>
          <div className="xx-body">
            <aside className="xx-body__sidebar">
              <div className="xx-tags">
                {
                  notes.length > 0 &&
                  <div className="xx-tags__title">
                    Примечания
                  </div>
                }
                <ul className="xx-tags__list">
                  {
                    notes.map(noteTitle => {
                      const foundNote = allNotes.find(note => note.title == noteTitle);
                      const hasImage = foundNote && !!foundNote.img;

                      return (
                        <li
                          key={noteTitle}
                          className={"xx-tags__item" + (hasImage ? ' xx-tags__item--image' : '')}
                          style={{
                            backgroundImage: (hasImage ? `url(https://s3.eu-central-1.amazonaws.com/arzamas-static/x/334-school-w9gxEU0N22MfiGAcrMoZs7TAa3/1200/notes/${foundNote.img.name}.jpg)` : null)
                          }}
                        >
                          <button
                            className="xx-btn-unstyled"
                            onClick={() => { openModal(() => this.setState({
                              showNote: true, noteId: noteTitle })) }}
                          >
                            {noteTitle}
                          </button>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </aside>
            <div className="xx-body__content">
              <div className="xx-game-header">
                <div className="xx-game-header__year">
                  { year }
                </div>
                <div className="xx-game-header__row">
                  <div className="xx-game-header__age">
                    { age }
                  </div>
                  <Badge
                    className="xx-game-header__badge"
                    currentRank={currentRank}
                  >
                    <div className="xx-badge__ribbon">
                      <button
                        className="xx-btn-unstyled"
                        onClick={() => openModal(() => this.setState({showTable: true}))}
                      >
                        Табель о рангах
                      </button>
                    </div>
                  </Badge>

                  <div className="xx-game-header__rank">
                    {
                      currentRank &&
                      <div className="xx-game-header__rank-title">{currentRank.displayText || currentRank.text}</div>
                    }
                    <div className="xx-game-header__rank-separator xx-separator" />
                    {
                      currentRank && currentRank.type &&
                      <div className="xx-game-header__rank-type">{rankTypes[currentRank.type]}</div>
                    }
                  </div>
                </div>
              </div>
              <div className="xx-paragraph">
                { this.convertNotices(text) }
              </div>
              {
                final &&
                <button
                  className="xx-btn xx-btn--inverted xx-options__button xx-mt_40 xx-as_c"
                  onClick={() => nextStage()}
                >
                  <i className="xx-icon xx-icon--arrow" />
                </button>
              }
              {
                options &&
                (
                  options.length === 1 ?
                    <button
                      className="xx-btn xx-btn--inverted xx-options__button xx-mt_40 xx-as_c"
                      onClick={() => this.showLevelModal(() => nextState(0))}
                    >
                      <i className="xx-icon xx-icon--arrow" />
                    </button>
                    :
                    <div className="xx-options">
                      <div className="xx-options__title">Выберите, что случится дальше</div>
                      <div className="xx-options__body">
                        {
                          options.map(({ text }, index) =>
                            <div className="xx-options__item" key={index}>
                              <div>
                                <span className="xx-letter">{ index === 0 ? 'а' : 'б' }</span>
                                { text }
                                <button
                                  className="xx-btn xx-btn--inverted xx-options__button"
                                  onClick={() => this.showLevelModal(() => nextState(index))}
                                >
                                  <i className="xx-icon xx-icon--arrow" />
                                </button>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                )
              }
            </div>
          </div>
        </div>
        {
          <div className={`xx-opacity-transition${this.state.showTable ? ' xx-opacity-transition--visible' : ''}`}>
            <Table
              currentRank={currentRank}
              onClose={() => closeModal(() => this.setState({ showTable: false }))}
            />
          </div>
        }
        {
          <div className={`xx-opacity-transition${this.state.showNote ? ' xx-opacity-transition--visible' : ''}`}>
            <Note
              noteId={this.state.noteId}
              onClose={() => closeModal(() => this.setState({ showNote: false }))}
            />
          </div>
        }
        {
          <div className={`xx-opacity-transition${this.state.showLevelModal ? ' xx-opacity-transition--visible' : ''}`}>
            <LevelNotification
              onClose={() => closeModal(() => this.setState({ showLevelModal: false }))}
              isLoading={this.state.isLoading}
              currentRank={currentRank}
              transitionText={transitionText}
            />
          </div>
        }
      </div>
    );
  }
}

const { func, shape, string, array } = React.PropTypes;

Game.propTypes = {
  nextState: func.isRequired,
  nextStage: func.isRequired,
  gameState: shape({
    text: string.isRequired,
    options: array,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
