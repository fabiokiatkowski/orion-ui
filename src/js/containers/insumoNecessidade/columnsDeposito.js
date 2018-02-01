import Types from '../../utils/filterTypes';
import { SummarySum } from '../../components/Summary';
import IntegerFormat from '../../components/NumeralFormat';

const columns = [
  {
    key: 'concat',
    name: 'Deposito',
    width: 300,
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 1,
    locked: true
  },
  {
    key: 'quantidade',
    name: 'Qtd. Estoque',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 2,
    locked: true
  }
];

export default columns;
