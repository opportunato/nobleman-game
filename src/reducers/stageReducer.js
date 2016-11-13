import { NEXT_STAGE, RESTART } from '../actions/stageActions';

export const STAGE_RULES = 'STAGE_RULES';
export const STAGE_INTRO = 'STAGE_INTRO';
export const STAGE_GAME = 'STAGE_GAME';
export const STAGE_SHARE = 'STAGE_SHARE';

export const nextStages = {
  [STAGE_RULES]: STAGE_INTRO,
  [STAGE_INTRO]: STAGE_GAME,
  [STAGE_GAME]: STAGE_SHARE,
};

const initialState = STAGE_INTRO;

const stageReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_STAGE:
      return nextStages[state];
    case RESTART:
      return STAGE_INTRO;
    default:
      return state;
  }
};

export default stageReducer;
