import ajax from './ajax.js';

const DICT = '/data/jmdict/jmdict.json';

export function loadDictionary() {
  if (loadDictionary.cache) {
    return Promise.resolve(loadDictionary.cache);
  }

  return ajax(DICT, { json: true })
    .then(data => loadDictionary.cache = data);
};

export function lookup(word, dictionary) {
  const len = dictionary.words.length;

  for (let i = 0; i < len; i++) {
    const item = dictionary.words[i];
    if ((item.kanji && item.kanji.indexOf(word) > -1) ||
        (item.kana && item.kana.indexOf(word) > -1)) {
      return item;
    }
  }
};
