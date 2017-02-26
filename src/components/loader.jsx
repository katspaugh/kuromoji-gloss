import React from 'react';
import getTokenizer from '../services/tokenizer.js';


export default class Loader extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    getTokenizer()
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false, error: true }))
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="gloss__loader">Loading dictionaries...</div>
      );
    }

    if (this.state.error) {
      return (
        <div className="gloss__loader gloss__loader-error">Error loading dictionaries</div>
      );
    }

    return null;
  }
}
