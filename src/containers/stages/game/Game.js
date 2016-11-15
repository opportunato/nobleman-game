import React from 'react';
import { connect } from 'react-redux';
import { nextGameState } from '../../../actions/gameStateActions';
import { nextStage } from '../../../actions/stageActions';
import ranks from '../../../ranks.json';
import Table from '../../../components/table/Table';

const mapDispatchToProps = dispatch => ({
  nextState: (index) => { dispatch(nextGameState(index)); },
  nextStage: () => { dispatch(nextStage()); },
});

const mapStateToProps = state => ({
  gameState: state.gameState,
});

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTable: true
    };
  }

  render() {
    const { gameState, nextState, nextStage } = this.props;

    return (
      <div className="xx-article">
        <div className="xx-container">
          <header className="xx-header">
            <a href="" className="xx-chapter xx-header__chapter">Петр I. Модернизация</a>
            <h1 className="xx-header__title">Жизнь дворянина</h1>
          </header>
          {
            !this.state.showTable &&
            <div className="xx-body">
              <aside className="xx-body__sidebar">
                <div className="xx-tags">
                  <h2 className="xx-tags__title">
                    Облако тэгов
                  </h2>
                  <ul className="xx-tags__list">
                    <li className="xx-tags__item">Орден св. Георгия III степени</li>
                    <li className="xx-tags__item">Конец войны</li>
                  </ul>
                </div>
              </aside>
              <div className="xx-body__content">
                <div className="xx-game-header">
                  <div className="xx-game-header__year">
                    { gameState.year }
                  </div>
                  <div className="">
                    { gameState.age }
                  </div>
                  <button onClick={() => this.setState({showTable: true})}>Табель</button>
                  <div>
                    {
                      gameState.rank
                        ? ranks.find(rank => rank.id === gameState.rank).text
                        : 'Без ранга'
                    }
                  </div>
                </div>
                <div className="xx-paragraph">
                  { gameState.text }
                </div>
                {
                  gameState.final &&
                  <button className="xx-btn xx-btn--inverted xx-mt_40 xx-as_c" onClick={() => nextStage()}>
                    <i className="xx-icon xx-icon--arrow" />
                  </button>
                }
                {
                  gameState.options &&
                  (
                    gameState.options.length === 1 ?
                      <button className="xx-btn xx-btn--inverted xx-mt_40 xx-as_c" onClick={() => nextState(0)}>
                        <i className="xx-icon xx-icon--arrow" />
                      </button>
                      :
                      <div className="xx-options">
                        <div className="xx-options__title">Выберите, что случится дальше</div>
                        <div className="xx-options__body">
                          {
                            gameState.options.map(({ text }, index) =>
                              <div className="xx-options__item" key={index}>
                                <div>
                                  <span className="xx-letter">{ index === 0 ? 'а' : 'б' }</span>
                                  { text }
                                  <button
                                    className="xx-btn xx-btn--inverted xx-options__button"
                                    onClick={() => nextState(index)}
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
            }
            {
              this.state.showTable &&
              <Table
                currentRank={gameState.rank}
                onClose={() => this.setState({ showTable: false })}
              />
            }
        </div>
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
