export const NEXT_STAGE = 'NEXT_STAGE';
export const RESTART = 'RESTART';

export const restart = () => ({
  type: RESTART,
  payload: true,
});

export const nextStage = () => ({
  type: NEXT_STAGE,
  payload: true,
});
