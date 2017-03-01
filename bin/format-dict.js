const fs = require('fs');
const lodash = require('lodash');

let dict = require('../jmdict_eng.json');

const words = lodash.cloneDeepWith(dict.words, (node) => {
  if (node && node.text) { return node.text; }

  if (node && node instanceof Object) {
    delete node.id;
    delete node.appliesToKanji;
    delete node.appliesToKana;
    delete node.misc;

    Object.keys(node).forEach(key => {
      if (node[key] instanceof Array) {
        if (node[key].length == 0) {
          delete node[key];
        } else if (node[key].length > 3) {
          node[key].length = 3;
        }
      }
    });
  }
});

fs.writeFileSync('./data/jmdict/jmdict.json', JSON.stringify({ words: words }));
