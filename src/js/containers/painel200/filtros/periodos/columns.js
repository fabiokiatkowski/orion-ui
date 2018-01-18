import SuperFilter from '../../../../components/SuperFilter';
import Types from '../../../../utils/filterTypes';
import { SummarySum } from '../../../../components/Summary';
import IntegerFormat from '../../../../components/NumeralFormat';

const columns = [
  {
    key: 'periodoComDescricao',
    name: 'Periodo',
    width: 200,
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
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
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
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
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 2
  }
];

export default columns;
