import { NEXT_GAME_STATE } from '../actions/gameStateActions';
import { RESTART, NEXT_STAGE } from '../actions/stageActions';
import script from 'script';

const START_STATE_ID = '1';

export const getNextStateId = (state, optionIndex) => {
  if (!state.options || !state.options[optionIndex]) {
    throw new Error('State doesn\'t have next options or the option you chose doesn\'t exist');
  }

  return state.options[optionIndex].next;
};

export const getState = (id) => {
  if (!script[id]) {
    throw new Error(`There is no state in script with id ${JSON.stringify(id)}`);
  }
  return ({ id, ...script[id], oldState: script[id], history: [] });
};

export const getInitialState = () =>
  getState(START_STATE_ID);

const initialState = getInitialState();

const gameStateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEXT_GAME_STATE:
      let history = state.history.concat(state.text);
      if (state.options.length > 1) {
        history = history.concat(state.options[payload.optionIndex].text);
      }

      return {
        ...state,
        ...getState(getNextStateId(state, payload.optionIndex)),
        oldState: state,
        history
      };
    case RESTART:
      return initialState;
    case NEXT_STAGE:
      if (state.history.length !== 0) {
        return {
          ...state,
          history: state.history.concat(state.text)
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default gameStateReducer;
