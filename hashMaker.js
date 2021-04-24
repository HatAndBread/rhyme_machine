const fs = require('fs');
const readline = require('readline');

const readWords = () => {
  return new Promise((resolve) => {
    const newWords = [];
    const wordInterface = readline.createInterface({
      input: fs.createReadStream('./words.txt')
    });
    wordInterface.on('line', function (line) {
      newWords.push({ word: line, pos: null });
    });
    wordInterface.on('close', () => {
      resolve(newWords);
    });
  });
};

const readPos = (newWords) => {
  return new Promise((resolve) => {
    const posInterface = readline.createInterface({
      input: fs.createReadStream('./parts-of-speech.txt')
    });
    let i = 0;
    posInterface.on('line', function (line) {
      newWords[i].pos = line.split(',');
      i += 1;
    });
    posInterface.on('close', () => {
      resolve(newWords);
    });
  });
};

readWords().then((result) => {
  readPos(result).then((result) => {
    fs.writeFile(`./${Math.random()}.js`, `const wordList = ${JSON.stringify(result)}`, (err) => {
      if (err) return console.log(err);
    });
  });
});
