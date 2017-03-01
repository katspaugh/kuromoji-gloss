import React from 'react';

import { tokenize, loadDefinitions } from '../services/gloss.js';
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

  processText(value) {
    this.setState({ tokens: [] });

    tokenize(value).then(tokens => {
      this.setState({ tokens });

      loadDefinitions(tokens).then(data => {
        this.setState({ tokens: data });
      });
    });
  }

  rotateMeanings(token) {
    token._count = token._count || 0;
    token._count = (token._count + 1) % token.definition.sense.length;
    token.meanings = token.definition.sense[token._count].gloss.join('; ');

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
