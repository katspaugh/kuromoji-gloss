import React from 'react';

export default function Words(props) {
  const words = props.tokens.map((token, i) => (
    <div className="gloss__row" key={ i }>
      <div className="gloss__col-word">{ token.basic_form }</div>

      <div className="gloss__col-reading">{ token.reading }</div>

      <div className="gloss__col-meanings">
        <button className="gloss__button gloss__button-sm gloss__edit-button"
                disabled={ !token.definition || token.definition.sense.length === 1 }
                onClick={ () => props.onEdit(token) }>↺</button>

        { token.meanings || <span className="loader"></span> }

        <button className="gloss__button gloss__button-sm gloss__remove-button"
                onClick={ () => props.onRemove(token) }>✕</button>
      </div>
    </div>
  ));

  return (
    <div className="gloss__words">
      <div className="gloss__row">
        <div className="gloss__col-word">Word</div>
        <div className="gloss__col-reading">Reading</div>
        <div className="gloss__col-meanings">Meanings</div>
      </div>

      { words }
    </div>
  );
};
