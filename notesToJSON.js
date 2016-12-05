import csv from 'csv';
import fs from 'fs';

fs.readFile('./notes.csv', (err, data) => {
  if (err) throw err;
  const result = [];

  csv.parse(data, (err, data) => {
    data.slice(1).map(state => {
      result.push({
        title: state[0].replace('\n', ""),
        text: state[1].replace(/(?:\r\n|\r|\n)/g, "<br/>"),
        img: state[2] ? {
          name: state[2],
          caption: state[3],
          copyright: state[4]
        } : null
      });
    });

    fs.writeFile('./src/notes.json', JSON.stringify(result, null, 2), (err, data) => {});
  });
});

