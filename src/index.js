import React from 'react';
import ReactDOM from 'react-dom';
import kuromoji from 'kuromoji';
import App from './components/app.jsx';

const KUROMOJI_DICT = '/data/kuromoji/dict';


function getTokenizer() {
  return new Promise((resolve, reject) => {
    if (getTokenizer.cache) return resolve(getTokenizer.cache);

    kuromoji.builder({ dicPath: KUROMOJI_DICT }).build((err, tokenizer) => {
      if (err) return reject(err);

      getTokenizer.cache = tokenizer;
      resolve(tokenizer);
    });
  });
}

function tokenizeText(text) {
  return getTokenizer.then(tokenizer => tokenizer.tokenize(text));
}

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#app-root')
);
