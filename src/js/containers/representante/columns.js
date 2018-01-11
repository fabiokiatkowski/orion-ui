import MultiCheckFilter from '../../components/MultiCheckFilter';
import Types from '../../utils/filterTypes';

const columns = [
  {
    key: 'numeroPedido',
    name: 'Numero Pedido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.NUMBER
  },
  {
    key: 'estado',
    name: 'Estado',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.TEXT
  },
  {
    key: 'situacao',
    name: 'Situacao',
    filterable: true,
    resizable: true,
    hidden: true,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'empresa',
    name: 'Empresa',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.TEXT
  },
  {
    key: 'regiao',
    name: 'Regiao',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.TEXT
  },
  {
    key: 'codigoRepresentante',
    name: 'Codigo Representante',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.NUMBER
  },
  {
    key: 'apelido',
    name: 'Apelido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.TEXT
  },
  {
    key: 'quantidadePedido',
    name: 'Quantidade Pedido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.NUMBER
  },
  {
    key: 'totalPedido',
    name: 'Total Pedido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.NUMBER
  },
  {
    key: 'codigoPeriodo',
    name: 'Codigo Periodo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.NUMBER
  },
  {
    key: 'descricaoPeriodo',
    name: 'Descricao Periodo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.TEXT
  },
];

export default columns;
