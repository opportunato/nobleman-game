/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */

import { difference } from 'lodash';
import { should } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import script from '../src/script.json';
import { getNextStateId, getState, getInitialState } from '../src/reducers/gameStateReducer';

should();

describe('Script', () => {
  let missingStates = [];
  let traversedStates = [];
  let allStates = Object.keys(script);

  const traverseScript = (state) => {
    traversedStates[state.id] = true;
    if (state.final) return;

    state.options.forEach((option, index) => {
      const nextStateId = getNextStateId(state, index);
      try {
        traverseScript({ ...state, ...getState(nextStateId) });
      } catch (err) {
        missingStates.push(nextStateId);
      }
    });
  };

  beforeEach(() => {
    missingStates = [];
    traversedStates = {};
    allStates = Object.keys(script);

    traverseScript(getInitialState());
  });

  it('should have no missing states', () => {
    console.log(missingStates);
    missingStates.should.have.length(0);
  });

  it('should traverse all states', () => {
    difference(allStates, Object.keys(traversedStates)).should.have.length(0);
  });
});
