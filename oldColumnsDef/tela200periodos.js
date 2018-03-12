import Types from '../src/js/utils/filterTypes';
import { SummarySum } from '../src/js/components/Summary';

const columns = [
  {
    key: 'periodoComDescricao',
    name: 'Periodo',
    width: 200,
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.TEXT,
    order: 1,
    locked: true
  },
  {
    key: 'quantidadeOrdens',
    name: 'OP',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    order: 3
  },
  {
    key: 'quantidadePecas',
    name: 'Peças',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    order: 2
  }
];

export default columns;
