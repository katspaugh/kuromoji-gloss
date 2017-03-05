import ajax from './ajax.js';

const apiUrl = 'https://mtvj4vwn56.execute-api.eu-west-1.amazonaws.com/dev/?keyword=';

export default function loadDefinition(keyword) {
  return ajax(apiUrl + encodeURIComponent(keyword), { json: true })
    .then(json => json.data);
};
