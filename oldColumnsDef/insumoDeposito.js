import Types from '../src/js/utils/filterTypes';
import { SummarySum } from '../src/js/components/Summary';

const columns = [
  {
    key: 'concat',
    name: 'Deposito',
    width: 300,
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    position: 1
  },
  {
    key: 'quantidade',
    name: 'Qtd.',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    summary: SummarySum,
    position: 2
  }
];

export default columns;
