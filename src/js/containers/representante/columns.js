import { Filters } from 'react-data-grid-addons';

const columns = [{
  key: 'numeroPedido',
  name: 'Numero Pedido',
  filterable: true,
  resizable: true,
  hidden: false,
  locked: true,
  sortable: true,
}, {
  key: 'codigoRepresentante',
  name: 'Codigo Representante',
  filterable: true,
  resizable: true,
  hidden: false,
  filterRenderer: Filters.NumericFilter,
  sortable: true,
  locked: true
}, {
  key: 'apelido',
  name: 'Apelido',
  filterable: true,
  resizable: true,
  hidden: false,
  filterRenderer: Filters.MultiSelectFilter,
  sortable: true,
  locked: true
}, {
  key: 'situacao',
  name: 'Situacao',
  filterable: true,
  resizable: true,
  hidden: false,
  sortable: true
}, {
  key: 'empresa',
  name: 'empresa',
  filterable: true,
  resizable: true,
  hidden: false,
  filterRenderer: Filters.AutoCompleteFilter,
  sortable: true
}, {
  key: 'regiao',
  name: 'Região',
  filterable: true,
  resizable: true,
  hidden: false,
  filterRenderer: Filters.SingleSelectFilter,
  sortable: true,
}, {
  key: 'codigoPeriodo',
  name: 'Codigo Periodo',
  filterable: true,
  resizable: true,
  hidden: false,
  sortable: true
}, {
  key: 'descricaoPeriodo',
  name: 'Descricao Periodo',
  filterable: true,
  resizable: true,
  hidden: false,
  sortable: true
}, {
  key: 'totalPedido',
  name: 'Total Pedido',
  filterable: true,
  resizable: true,
  hidden: false,
  sortable: true
},
];

export default columns;
