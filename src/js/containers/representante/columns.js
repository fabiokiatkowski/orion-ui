import SuperFilter from '../../components/SuperFilter';
import Types from '../../utils/filterTypes';
import SummarySum from '../../components/SummarySum';

const columns = [
  {
    key: 'numeroPedido',
    name: 'Numero Pedido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 0,
    locked: true
  },
  {
    key: 'estado',
    name: 'Estado',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 1
  },
  {
    key: 'situacao',
    name: 'Situacao',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    order: 2,
    draggable: true
  },
  {
    key: 'empresa',
    name: 'Empresa',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 3,
    draggable: true
  },
  {
    key: 'regiao',
    name: 'Regiao',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 4,
    draggable: true
  },
  {
    key: 'codigoRepresentante',
    name: 'Codigo Representante',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 5,
    draggable: true
  },
  {
    key: 'apelido',
    name: 'Apelido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 6,
    draggable: true
  },
  {
    key: 'quantidadePedido',
    name: 'Quantidade Pedido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 7,
    draggable: true,
    summary: SummarySum
  },
  {
    key: 'totalPedido',
    name: 'Total Pedido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 8,
    draggable: true,
    summary: SummarySum
  },
  {
    key: 'codigoPeriodo',
    name: 'Codigo Periodo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 9,
    draggable: true
  },
  {
    key: 'descricaoPeriodo',
    name: 'Descricao Periodo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 10,
    draggable: true
  }
];

export default columns;
