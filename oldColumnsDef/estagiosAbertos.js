import Types from '../src/js/utils/filterTypes';
import { SummarySum } from '../src/js/components/Summary';

const columns = [
  {
    key: 'estagioComDescricao',
    name: 'Estágio',
    width: 200,
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.TEXT,
    position: 1,
    locked: true
  },
  {
    key: 'quantidadeOrdensAProduzir',
    name: 'OP',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    position: 2
  },
  {
    key: 'quantidadePecasAProduzir',
    name: 'Peças',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    position: 3
  },
  {
    key: 'descricaoAgrupador',
    name: 'Agrupador',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.TEXT,
    position: 4
  },
  {
    key: 'responsavelEstagio',
    name: 'Responsável',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.NUMBER,
    position: 5
  }
];

export default columns;
