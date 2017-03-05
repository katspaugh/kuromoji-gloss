import React from 'react';

import { tokenize, lookup } from '../services/gloss.js';
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
    this._onEdit = (token) => this.rotateMeanings(token);
    this._onRemove = (token) => this.deleteToken(token);
  }

  loadDefinitions() {
    const load = (index) => {
      const token = this.state.tokens[index];

      lookup(token.basic_form)
        .then(data => {
          token.definition = data;
          token.reading = data.readings[0] || token.reading;
          token.meanings = data.meanings[0].join('; ');

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

    tokenize(value).then(tokens => {
      this.setState({ tokens });
      this.loadDefinitions();
    });
  }

  rotateMeanings(token) {
    token._count = token._count || 0;
    token._count = (token._count + 1) % token.definition.meanings.length;
    token.meanings = token.definition.meanings[token._count].join('; ');

    this.setState({ tokens: this.state.tokens });
  }

  deleteToken(token) {
    this.state.tokens.splice(this.state.tokens.indexOf(token), 1);
    this.setState({ tokens: this.state.tokens });
  }

  render() {
    const exportButton = this.state.tokens.length ?
      <button className="gloss__button gloss__button-lg" onClick={ this._exportCsv }>Export CSV</button> :
      '';

    return (
      <div className="gloss">
        <Header />

        <div className="gloss__main">
          <div className="gloss__form">
            <Form onSubmit={ this._onSubmit } />
          </div>

          <div className="gloss__result">
            <Words tokens={ this.state.tokens } onEdit={ this._onEdit } onRemove={ this._onRemove } />

            { exportButton }

            <Loader />
          </div>
        </div>
      </div>
    );
  }
};
