/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */

import { difference } from 'lodash';
import { should } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import script from '../src/script.json';
import notes from '../src/notes.json';
import fs from 'fs';
import { getNextStateId, getState, getInitialState } from '../src/reducers/gameStateReducer';

should();

describe('Script', function() {
  this.timeout(400000);
  // let missingStates = [];
  // let traversedStates = [];
  let allStates = Object.keys(script);

  // const traverseScript = (state) => {
  //   traversedStates[state.id] = true;
  //   if (state.final) return;
  //
  //   state.options.forEach((option, index) => {
  //     const nextStateId = getNextStateId(state, index);
  //     try {
  //       traverseScript({ ...state, ...getState(nextStateId) });
  //     } catch (err) {
  //       missingStates.push(nextStateId);
  //     }
  //   });
  // };
  //
  // beforeEach(function() {
  //   missingStates = [];
  //   traversedStates = {};
  //   allStates = Object.keys(script);
  //
  //   traverseScript(getInitialState());
  // });
  //
  // it('should have no missing states', () => {
  //   missingStates.should.have.length(0);
  // });
  //
  // it('should traverse all states', () => {
  //   difference(allStates, Object.keys(traversedStates)).should.have.length(0);
  // });

  const missingNotes = {};
  it('should have notes from notes.json', () => {
    allStates.forEach(key => {
      script[key].notes.forEach(noteTitle => {

        const foundNote = notes.find(note => note.title === noteTitle);
        if (!foundNote) {
          missingNotes[noteTitle] = true;
        }
      });
    });
    console.log(JSON.stringify(Object.keys(missingNotes), null, 2));
    Object.keys(missingNotes).should.have.length(0);
  });
});

describe('Notes', function() {
  it('should have images from pictures', () => {
    const missingImages = {};
    notes.forEach(note => {
      if (!note.img) return;
      if (!fs.existsSync(`./pictures/${note.img.name}.jpg`)) {
        missingImages[note.img.name] = true;
      }
    });
    console.log(JSON.stringify(Object.keys(missingImages), null, 2));
    Object.keys(missingImages).should.have.length(0);
  });

  it('has sizes for all images', () => {
    const missingImages = {};
    notes.forEach(note => {
      if (!note.img) return;
      if (!note.img.width || !note.img.height) {
        missingImages[note.img.name] = true;
      }
    });
    console.log(JSON.stringify(Object.keys(missingImages), null, 2));
    Object.keys(missingImages).should.have.length(0);
  });
});
