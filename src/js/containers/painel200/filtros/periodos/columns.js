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
    key: 'quantidadePecas',
    name: 'Peças',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    summary: SummarySum,
    order: 2
  },
  {
    key: 'quantidadeOrdens',
    name: 'Ordens',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 3
  }
];

export default columns;
