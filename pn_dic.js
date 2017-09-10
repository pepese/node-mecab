const fs = require('fs');
const readline = require('readline');
const rs = fs.ReadStream('./dic/pn_ja.dic');
const rl = readline.createInterface({'input': rs, 'output': {}});

let noun = [];
let verb = [];
let adjective = [];
let adverb = [];
let auxiliary = [];

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
  } else {
    console.log(word[2]);
  }
});
rl.resume();
console.log(adjective);

const match = (word, part) => {
  for(let i=0; i<part.length; i++) {
    const dic_word = part[i][0];
    const dic_score = parseFloat(part[i][3]);
    console.log("roop2: " + dic_word);
    if(dic_word == word) {
      return dic_score;
    }
  }
}

const calc = (morpheme_arr) => {
  let score = 0;
  for(let i=0; i<morpheme_arr.length; i++) {
    console.log("roop1");
    const morpheme = morpheme_arr[i];
    const part = morpheme[1];
    const word = morpheme[7];
    if(part == "名詞") {
      console.log("名詞: " + word);
      score = score + match(word, noun);
    } else if(part == "動詞") {
      console.log("動詞: " + word);
      score = score + match(word, verb);
    } else if(part == "形容詞") {
      console.log("形容詞: " + word);
      score = score + match(word, adjective);
    } else if(part == "副詞") {
      console.log("副詞: " +  + word);
      score = score + match(word, adverb);
    } else if(part == "助動詞") {
      console.log("助動詞: " + word);
      score = score + match(word, auxiliary);
    } else {
      return 0;
    }
  }
  return score;
}

module.exports = calc;
