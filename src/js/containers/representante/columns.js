import { Filters } from 'react-data-grid-addons';

const columns = [{
  key: 'numeroPedido',
  name: 'Numero Pedido',
  filterRenderer: Filters.NumericFilter,
  filterable: true,
  resizable: true,
  hidden: false,
  locked: true
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
  filterRenderer: Filters.NumericFilter,
  filterable: true,
  resizable: true,
  hidden: false,
}, {
  key: 'empresa',
  name: 'empresa',
  filterable: true,
  resizable: true,
  hidden: false,
  filterRenderer: Filters.AutoCompleteFilter
}, {
  key: 'regiao',
  name: 'Região',
  filterable: true,
  resizable: true,
  hidden: false,
  filterRenderer: Filters.SingleSelectFilter
}, {
  key: 'codigoPeriodo',
  name: 'Codigo Periodo',
  filterable: true,
  resizable: true,
  hidden: false,
}, {
  key: 'descricaoPeriodo',
  name: 'Descricao Periodo',
  filterable: true,
  resizable: true,
  hidden: false,
}, {
  key: 'totalPedido',
  name: 'Total Pedido',
  filterable: true,
  resizable: true,
  hidden: false
}];

export default columns;
