export const NEXT_GAME_STATE = 'NEXT_GAME_STATE';

export const nextGameState = index => ({
  type: NEXT_GAME_STATE,
  payload: { optionIndex: index },
});
