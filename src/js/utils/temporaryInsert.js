import axios from '../axios-orion';
import visualizador from '../../../tempColumns/visualizador';
import ondeUsaVisualizador from '../../../tempColumns/ondeUsaVisualizador';
import { SummaryCount, SummaryAverage, SummaryDistinctCount, SummarySum } from '../components/Summary';

const getSummaryIndex = (summary) => {
  if (summary instanceof SummaryCount) {
    return 1;
  }
  if (summary instanceof SummaryDistinctCount) {
    return 2;
  }
  if (summary instanceof SummaryAverage) {
    return 3;
  }
  if (summary instanceof SummarySum) {
    return 4;
  }

  return 0;
};

const temporaryInsert = (gridName, columns) => {
  const columnsS = columns.map((x) => {
    const y = x;
    y.summary_index = getSummaryIndex(y.summary);
    y.formatter_index = 0;
    delete y.summary;
    delete y.formatter;
    delete y.filterRenderer;
    return y;
  });
  const url = `/api/grid/${gridName}/temporary`;
  axios.post(url, columnsS);
};

export default () => {
  // temporaryInsert('visualizador', visualizador);
  // temporaryInsert('ondeUsaVisualizador', ondeUsaVisualizador);
};

