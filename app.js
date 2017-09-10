const calc = require("./pn_dic");
let MeCab = new require('mecab-async');
let mecab = new MeCab();
let input = process.argv[2];

mecab.parse(input,(err,result)=>{
  if(err){
  }
  console.log(calc(result));
});
