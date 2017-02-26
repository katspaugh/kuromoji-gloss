import kuromoji from 'kuromoji';
const KUROMOJI_DICT = '/data/kuromoji/dict';

let tokenizer = null;

const tokenizerPromise = new Promise((resolve, reject) => {
  kuromoji.builder({ dicPath: KUROMOJI_DICT }).build((err, tokenizerObj) => {
    if (err) return reject(err);
    tokenizer = tokenizerObj;
    resolve(tokenizer);
  });
});

export default function getTokenizer() {
  if (tokenizer) return Promise.resolve(tokenizer);
  return tokenizerPromise;
};
