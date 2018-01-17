import SuperFilter from '../../../../components/SuperFilter';
import Types from '../../../../utils/filterTypes';
import { SummarySum } from '../../../../components/Summary';
import IntegerFormat from '../../../../components/NumeralFormat';

const columns = [
  {
    key: 'estagioComDescricao',
    name: 'Estágio',
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
    key: 'quantidadeOrdensAProduzir',
    name: 'OP',
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
    key: 'quantidadePecasAProduzir',
    name: 'Peças',
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
    key: 'descricaoAgrupador',
    name: 'Agrupador',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 4
  },
  {
    key: 'responsavelEstagio',
    name: 'Responsável',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 5
  }
];

export default columns;
