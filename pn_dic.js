const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./dic/pn_ja.dic');
const rl = readline.createInterface({'input': rs, 'output': {}});

let noun = [];
let verb = [];
let adjective = [];
let adverb = [];
let auxiliary = [];
let setUpEndFlag = false;

const setUp = () => {
  return new Promise((resolve, reject) => {
    if(!setUpEndFlag) {
      rl.on('line', (line) => {
        const word = line.split(":");
        if(word[2] == "名詞") {
          noun.push(word);
        } else if(word[2] == "動詞") {
          verb.push(word);
        } else if(word[2] == "形容詞") {
          adjective.push(word);
        } else if(word[2] == "副詞") {
          adverb.push(word);
        } else if(word[2] == "助動詞") {
          auxiliary.push(word);
        }
      }).on('close', () => {
        setUpEndFlag = true;
        resolve();
      });
    }
  });
};

const match = (word, part) => {
  for(let i=0; i<part.length; i++) {
    const dic_word = part[i][0];
    const dic_score = parseFloat(part[i][3]);
    if(dic_word == word) {
      return dic_score;
    }
  }
  return 0;
}

const calc = (morpheme_arr) => {
  return setUp().then(() => {
    let score = 0;
    for(let i=0; i<morpheme_arr.length; i++) {
      const morpheme = morpheme_arr[i];
      const part = morpheme[1];
      const word = morpheme[7];
      if(part == "名詞") {
        score = score + match(word, noun);
      } else if(part == "動詞") {
        score = score + match(word, verb);
      } else if(part == "形容詞") {
        score = score + match(word, adjective);
      } else if(part == "副詞") {
        score = score + match(word, adverb);
      } else if(part == "助動詞") {
        score = score + match(word, auxiliary);
      }
    }
    return score;
  });
}

module.exports = calc;
