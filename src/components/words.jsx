import React from 'react';

export default class Words extends React.Component {
  render() {
    const words = this.props.tokens.map((token, i) => {
      let definitions = '';
      try {
        definitions = token.definitions[0].senses[0].english_definitions.join('; ');
      } catch (e) {}

      let reading = token.reading;
      try {
        reading = token.definitions[0].japanese[0].reading || token.reading;
      } catch (e) {}

      return (
        <tr key={ i }>
          <td>{ token.basic_form }</td>
          <td>{ reading }</td>
          <td>{ definitions }</td>
        </tr>
      );
    });

    return (
      <div className="gloss__words">
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>Reading</th>
              <th width="100%">Definition</th>
            </tr>
          </thead>

          <tbody>
            { words }
          </tbody>
        </table>
      </div>
    );
  }
}
