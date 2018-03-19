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
    const value = `春は、寒い冬から気温が上がり始め、朝晩はまだ肌寒さはあるが次第に日中は暖かくなる時期であり、秋と並んで一年の中では最も気候の良い穏やかな季節とも言われる。雪や氷が溶け、植物が芽を出す時期である。寒さが次第に緩み、草木が萌え芽ぐみ、花々がつぼみをつけ、満開になる。日が永くなり、地中の虫が動き始める。桜が散り、次第に木々の緑が濃さを増し、暑い日が増えてきて、終わる。`;
    return (
      <form onSubmit={ this._onSubmit }>
        <textarea name="text" rows="20" cols="90" defaultValue={ value } />

        <button className="gloss__button gloss__button-lg" type="submit">Create gloss</button>
      </form>
    );
  }
}
