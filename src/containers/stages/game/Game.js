import React from 'react';
import { connect } from 'react-redux';
import { nextGameState } from '../../../actions/gameStateActions';
import { nextStage } from '../../../actions/stageActions';
import ranks from '../../../ranks.json';
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
        this.setState({ isLoading: false, showLevelModal: false });
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

  render() {
    const { gameState: { rank: rankId, year, age, text, final, options, transitionText }, nextState, nextStage } = this.props;
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
                <div className="xx-tags__title">
                  Облако тэгов
                </div>
                <ul className="xx-tags__list">
                  <li className="xx-tags__item">
                    <button
                      className="xx-btn-unstyled"
                      onClick={() => { openModal(() => this.setState({ noteId: "Орден св. Георгия III степени" })) }}
                    >
                      Орден св. Георгия III степени
                    </button>
                  </li>
                  <li className="xx-tags__item">
                    <button
                      className="xx-btn-unstyled"
                      onClick={() => { openModal(() => this.setState({ noteId: "Конец войны" })) }}
                    >
                      Конец войны
                    </button>
                  </li>
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
                      <div className="xx-game-header__rank-title">{currentRank.text}</div>
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
                { text }
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
          this.state.showTable &&
          <Table
            currentRank={currentRank}
            onClose={() => closeModal(() => this.setState({ showTable: false }))}
          />
        }
        {
          this.state.noteId &&
          <Note
            noteId={this.state.noteId}
            onClose={() => closeModal(() => this.setState({ noteId: null }))}
          />
        }
        {
          this.state.showLevelModal &&
          <LevelNotification
            onClose={() => closeModal(() => this.setState({ showLevelModal: false }))}
            isLoading={this.state.isLoading}
            currentRank={currentRank}
            transitionText={transitionText}
          />
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
