import axios from '../axios-orion';
import visualizador from '../../../oldColumnsDef/visualizador';
import ondeUsaVisualizador from '../../../oldColumnsDef/ondeUsaVisualizador';
import insumoNecessidade from '../../../oldColumnsDef/insumoNecessidade';
import insumoDeposito from '../../../oldColumnsDef/insumoDeposito';
import insumoRolos from '../../../oldColumnsDef/insumoRolos';
import estagiosAbertos from '../../../oldColumnsDef/estagiosAbertos';
import tela200ordens from '../../../oldColumnsDef/tela200ordens';
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
  temporaryInsert('visualizador', visualizador);
  temporaryInsert('ondeUsaVisualizador', ondeUsaVisualizador);
  temporaryInsert('insumoRolos', insumoRolos);
  temporaryInsert('insumoNecessidade', insumoNecessidade);
  temporaryInsert('insumoDeposito', insumoDeposito);
  temporaryInsert('tela200estagiosAbertos', estagiosAbertos);
  temporaryInsert('tela200ordens', tela200ordens);
};

