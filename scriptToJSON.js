import csv from 'csv';
import fs from 'fs';
import ranks from './src/ranks.json';
import {isNull, omitBy} from 'lodash';

const FINAL = 'КОНЕЦ';
const OPTION = 'РАЗВИЛКА';

const getYear = (string) => {
  return string.split("\n")[0].trim();
};

const getAge = (string) => {
  return string.split("\n")[1].trim();
};

const isFinal = (string) => {
  return new RegExp(FINAL).test(string);
};

const getText = (string) => {
  return string.split(OPTION)[0].replace(FINAL, '').split('Переход к')[0].trim();
};

const hasOption = (string) => {
  return new RegExp(OPTION).test(string);
};

const getOptionId = (string) => {
 return /Переход к ([\dаб]+)/gim.exec(string)[1];
};

const getOptionText = (string, index) => {
  return string.split(index + ')')[1].split('Переход к')[0].trim();
};

const getRankId = (string) => {
  const isGuard = string.indexOf('гвардейский ') !== -1;
  if (isGuard) {
    string = string.replace('гвардейский ', '');
  }
  const isRank = (rank) => {
    return string.trim() === rank.text.toLowerCase() && (!isGuard || rank.militaryType === 'guard');
  };
  const rank = ranks.find(isRank);
  return rank ? rank.id : null;
};

const getOptions = (string) => {
  if (isFinal(string)) return null;
  if (hasOption(string)) return [
    {
      next: getOptionId(string.split('2)')[0]),
      text: getOptionText(string, 1)
    },
    {
      next: getOptionId(string.split('2)')[1]),
      text: getOptionText(string, 2)
    }
  ];
  return [{ next: getOptionId(string) }];
};

fs.readFile('./script.csv', (err, data) => {
  if (err) throw err;
  const result = {};

  csv.parse(data, (err, data) => {
    data.slice(2).map(state => {
      result[state[0]] = {
        year: getYear(state[1]),
        age: getAge(state[1]),
        text: getText(state[2]),
        options: getOptions(state[2]),
        rank: getRankId(state[3].split('\n')[0].toLowerCase()),
        final: isFinal(state[2]),
        transitionText: state[4],
        notes: state[5].replace(/\(?картинка\??\)?/ig, '').split('\n').map(string => string.trim()).filter(string => !!string)
      };
    });

    fs.writeFile('./src/script.json', JSON.stringify(result, null, 2), (err, data) => {});
  });
});

