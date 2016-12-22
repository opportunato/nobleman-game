import notes from './src/notes.json';
import script from './src/script.json';
import fs from 'fs';
import request from 'superagent';

const typograph = async function (text) {
  const {body} = await request.post('http://mdash.ru/api.v1.php').send(`text=${text}`);
  return body.result.slice(3, -4);
};

(async function() {
  for await (const note of notes) {
    note.text = await typograph(note.text);
    if (note.img) {
      note.img.caption = await typograph(note.img.caption);
    }
  }
  for await (const scriptId of Object.keys(script)) {
    const state = script[scriptId]
    state.text = await typograph(state.text);
    if (state.options) {
      for await (const option of state.options) {
        if (option.text) {
          option.text = await typograph(option.text);
        }
      }
    }
  }

  fs.writeFile('./src/notes.json', JSON.stringify(notes, null, 2), (err, data) => {});
  fs.writeFile('./src/script.json', JSON.stringify(script, null, 2), (err, data) => {});
})();
