export default function exportCsv(tokens, name) {
  const lines = tokens.map(token => {
    const definitions = token.definitions ?
      token.definitions[0].senses[0].english_definitions.join('; ') :
      '';

    const reading = token.definitions ?
      token.definitions[0].japanese[0].reading || token.reading:
      token.reading;

    const cols = [
      token.basic_form,
      definitions,
      reading,
      token.sentence
    ];

    return cols.join('\t');
  });

  const csv = lines.join('\n');
  const url = 'data:text/tab-separated-values;charset=utf-8,' + encodeURIComponent(csv)

  window.open(url, 'kuromoji-gloss');
};
