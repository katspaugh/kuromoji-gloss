import ajax from './ajax.js';

const apiUrl = 'https://cors-anywhere.herokuapp.com/http://jisho.org/api/v1/search/words?keyword=';

export default function loadDefinition(keyword) {
  return ajax(apiUrl + encodeURIComponent(keyword), { json: true })
    .then(json => json.data);
};
