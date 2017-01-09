import { NEXT_GAME_STATE } from '../actions/gameStateActions';
import { RESTART } from '../actions/stageActions';
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
  return ({ id, ...script[id], oldState: {} });
};

export const getInitialState = () =>
  getState(START_STATE_ID);

const initialState = getInitialState();

const gameStateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEXT_GAME_STATE:
      return {
        ...state,
        ...getState(getNextStateId(state, payload.optionIndex)),
        oldState: state
      };
    case RESTART:
      return initialState;
    default:
      return state;
  }
};

export default gameStateReducer;
