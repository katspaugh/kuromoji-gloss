import React from 'react';

import gloss from '../services/gloss.js';
import loadDefinition from '../services/jisho.js';

import Form from './form.jsx';
import Words from './words.jsx';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tokens: []
    };

    this._onSubmit = (value) => this.process(value);
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

  process(value) {
    this.setState({ tokens: [] });

    gloss(value).then(data => {
      this.setState({ tokens: data });
      this.loadDefinitions();
    });
  }

  render() {
    return (
      <div className="gloss">
        <div className="gloss__form">
          <Form onSubmit={ this._onSubmit } />
        </div>

        <div className="gloss__result">
          <Words tokens={ this.state.tokens } />
        </div>
      </div>
    );
  }
}
