export default function exportCsv(tokens, name) {
  const lines = tokens.map(token => {
    const cols = [
      token.basic_form,
      token.meanings,
      token.reading,
      token.sentence
    ];

    return cols.join('\t');
  });

  const csv = lines.join('\n');
  const url = 'data:text/tab-separated-values;charset=utf-8,' + encodeURIComponent(csv)

  window.open(url, 'kuromoji-gloss');
};
