import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="gloss__header">
        <h1>Insert a Japanese text:</h1>

        <div className="gloss__credits">
          <span>Powered by <a href="http://www.atilika.org/">Kuromoji</a> and <a href="http://jisho.org/">Jisho.org</a></span>

          <a className="github-button" href="https://github.com/katspaugh/kuromoji-gloss" data-icon="octicon-star" data-style="mega" data-count-href="/katspaugh/kuromoji-gloss" data-count-api="/repos/katspaugh/kuromoji-gloss#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star katspaugh/kuromoji-gloss on GitHub">Star</a>
        </div>
      </div>
    );
  }
}
