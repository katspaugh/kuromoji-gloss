import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this._onSubmit = (e) => {
      e.preventDefault();
      props.onSubmit(e.target.elements.text.value);
    };
  }

  render() {
    const value = `越後が本家であると言はれるおけさ節の朝から晩まで聞ける相川は、毎年七月十三、十四、十五と三日續いての鑛山まつりに、全島のお祭好きを呼び集めます。此時には遙遙海を越えた新潟縣からも、或は祭見に、或は踊りに來る人があります。ほんとうの盆は舊暦ですからこれよりも後になりますが、これはほんのおしるしだけでして、相川の町ではこの鑛山祭を盆と呼んで居ります。`;

    return (
      <form onSubmit={ this._onSubmit }>
        <textarea name="text" rows="20" cols="90" defaultValue={ value } />

        <div>
          <button type="submit">Create gloss</button>
        </div>
      </form>
    );
  }
}
