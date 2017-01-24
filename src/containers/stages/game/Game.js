import React from "react";
import {connect} from "react-redux";
import {nextGameState} from "../../../actions/gameStateActions";
import {nextStage} from "../../../actions/stageActions";
import ranks from "../../../ranks.json";
import allNotes from "notes";
import Table from "../../../components/table/Table";
import Note from "../../../components/note/Note";
import LevelNotification from "../../../components/LevelNotification";
import Badge from "../../../components/Badge";

const mapDispatchToProps = dispatch => ({
  nextState: (index) => {
    dispatch(nextGameState(index));
  },
  nextStage: () => {
    dispatch(nextStage());
  },
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

const isRankFromTabel = (currentRank) => {
  return ranks.find(rank => rank.id === currentRank.id && rank.level)
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
        <span
          className={"xx-notice__balloon xx-notice__balloon--flipped" + (isOpened ? ' xx-notice__balloon--opened' : "")}
          dangerouslySetInnerHTML={{__html: text}}
        >
        </span>
      </span>
    );
  }
}

const reNotice = /\[notice=([^\[\]\(\)]*)\]/;
const reNote = /\(([^\[\]\(\)]*)\)\[note='([^\[\]\(\)]*)'\]/;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTable: false,
      noteId: null,
      showLevelModal: false,
      isLoading: false,
      hasTransitioned: false
    };
  }

  componentWillReceiveProps(newProps) {
    const {gameState:newGameState} = newProps;

    if (newGameState.id !== this.props.gameState.id) {
      this.setState({hasTransitioned: false});
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

  convertText = (text) => {
    const matchNotice = reNotice.exec(text);
    const matchNote = reNote.exec(text);

    if (matchNotice && (!matchNote || matchNotice.index < matchNote.index)) {
      return (
        <span>
          <span dangerouslySetInnerHTML={{__html: text.substr(0, matchNotice.index)}}/>
          <Notice text={matchNotice[1]}/>
          {this.convertText(text.substr(matchNotice.index + matchNotice[0].length))}
        </span>
      );
    } else if (matchNote) {
      return (
        <span>
          <span dangerouslySetInnerHTML={{__html: text.substr(0, matchNote.index)}}/>
          <a
             onClick={() => {
               openModal(() => this.setState({
                 showNote: true, noteId: matchNote[2]
               }))
             }}
          >
            {matchNote[1]}
          </a>
          {this.convertText(text.substr(matchNote.index + matchNote[0].length))}
      </span>
      );
    } else {
      return <span dangerouslySetInnerHTML={{__html: text}}/>
    }
  };

  render() {
    const {gameState: {rank: rankId, year, age, text, final, options, transitionText, notes}, nextState, nextStage} = this.props;
    const {hasTransitioned} = this.state;
    const currentRankId = hasTransitioned ? rankId : this.props.gameState.oldState.rank;
    const currentRank = ranks.find(rank => rank.id === currentRankId);

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
                            onClick={() => {
                              openModal(() => this.setState({
                                showNote: true, noteId: noteTitle
                              }))
                            }}
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
                    <div className="xx-game-header__title">
                      Возраст
                    </div>
                    { age }
                  </div>
                  <Badge
                    className="xx-game-header__badge"
                    currentRank={ currentRank }
                  >
                    {
                      currentRank && isRankFromTabel(currentRank) &&
                      <div className="xx-badge__ribbon">
                        <button
                          className="xx-btn-unstyled"
                          onClick={() => openModal(() => this.setState({showTable: true}))}
                        >
                          Показать табель о рангах
                        </button>
                      </div>
                    }
                  </Badge>
                  {
                    (rank => (
                      <div className="xx-game-header__rank">
                        <div className="xx-game-header__title">
                          Чин
                        </div>
                        {
                          rank &&
                          <div className="xx-game-header__rank-title">{rank.displayText || rank.text}</div>
                        }
                        {
                          rank && rank.type &&
                          <div className="xx-game-header__rank-type">{rankTypes[rank.type]}</div>
                        }
                      </div>
                    ))(currentRank)
                  }
                </div>
              </div>
              <div className="xx-paragraph">
                { text.split('<br /><br />').map((p, i) => <p key={i}>{this.convertText(p)}</p>) }
              </div>
              {
                final &&
                <button
                  className="xx-btn xx-btn--inverted xx-options__button xx-mt_40 xx-as_c"
                  onClick={() => nextStage()}
                >
                  <i className="xx-icon xx-icon--arrow"/>
                </button>
              }
              {
                options &&
                (
                  (options.length === 1 || (!hasTransitioned && transitionText)) ?
                    <button
                      className="xx-btn xx-btn--inverted xx-options__button xx-mt_40 xx-as_c"
                      onClick={() => this.showLevelModal(() => {
                        if (transitionText) {
                          this.setState({hasTransitioned: true, isLoading: false});
                        } else {
                          closeModal(() => {
                            this.setState({showLevelModal: false, hasTransitioned: true});
                            nextState(0);
                          });
                        }
                      })}
                    >
                      <i className="xx-icon xx-icon--arrow"/>
                    </button>
                    :
                    <div className="xx-options">
                      <div className="xx-options__title">Выберите, что случится дальше</div>
                      <div className="xx-options__body">
                        {
                          options.map(({text}, index) =>
                            <div className="xx-options__item" key={index}>
                              <div>
                                <span className="xx-letter">{ index === 0 ? 'а' : <span style={{left: '1px', position: 'relative'}}>б</span> }</span>
                                {this.convertText(text)}
                                <button
                                  className="xx-btn xx-btn--inverted xx-options__button"
                                  onClick={() => this.showLevelModal(() => {
                                    this.setState({hasTransitioned: true});
                                    closeModal(() => {
                                      this.setState({showLevelModal: false});
                                      nextState(index);
                                    });
                                  })}
                                >
                                  <i className="xx-icon xx-icon--arrow"/>
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
              onClose={() => closeModal(() => this.setState({showTable: false}))}
            />
          </div>
        }
        {
          <div className={`xx-opacity-transition${this.state.showNote ? ' xx-opacity-transition--visible' : ''}`}>
            <Note
              noteId={this.state.noteId}
              onClose={() => closeModal(() => this.setState({showNote: false}))}
            />
          </div>
        }
        {
          <div className={`xx-opacity-transition${this.state.showLevelModal ? ' xx-opacity-transition--visible' : ''}`}>
            <LevelNotification
              onClose={() => closeModal(() => {
                this.setState({showLevelModal: false});
                if (options.length === 1) {
                  nextState(0);
                }
              })}
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

const {func, shape, string, array} = React.PropTypes;

Game.propTypes = {
  nextState: func.isRequired,
  nextStage: func.isRequired,
  gameState: shape({
    text: string.isRequired,
    options: array,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
