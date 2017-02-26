import React from 'react';

import gloss from '../services/gloss.js';
import loadDefinition from '../services/jisho.js';
import exportCsv from '../services/csv.js';

import Header from './header.jsx';
import Loader from './loader.jsx';
import Form from './form.jsx';
import Words from './words.jsx';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tokens: []
    };

    this._onSubmit = (value) => this.processText(value);
    this._exportCsv = () => exportCsv(this.state.tokens);
  }

  loadDefinitions() {
    const load = (index) => {
      const token = this.state.tokens[index];

      loadDefinition(token.basic_form)
        .then(data => {
          token.definitions = data;
          this.setState({ tokens: this.state.tokens });

          if (index < this.state.tokens.length - 1) {
            load(index + 1);
          }
        });
    };

    load(0);
  }

  processText(value) {
    this.setState({ tokens: [] });

    gloss(value).then(data => {
      this.setState({ tokens: data });
      this.loadDefinitions();
    });
  }

  render() {
    const exportButton = this.state.tokens.length ?
          (<button className="gloss__button" onClick={ this._exportCsv }>Export CSV</button>) :
          '';

    return (
      <div className="gloss">
        <Header />

        <div className="gloss__main">
          <div className="gloss__form">
            <Form onSubmit={ this._onSubmit } />
          </div>

          <div className="gloss__result">
            <Words tokens={ this.state.tokens } />

            { exportButton }

            <Loader />
          </div>
        </div>
      </div>
    );
  }
}
