import { Filters } from 'react-data-grid-addons';
import MultiCheckFilter from '../../components/MultiCheckFilter';

const columns = [
  {
    key: 'numeroPedido',
    name: 'Numero Pedido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'estado',
    name: 'Estado',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'situacao',
    name: 'Situacao',
    filterable: true,
    resizable: true,
    hidden: false,
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
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'regiao',
    name: 'Regiao',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'codigoRepresentante',
    name: 'Codigo Representante',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'apelido',
    name: 'Apelido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'quantidadePedido',
    name: 'Quantidade Pedido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'totalPedido',
    name: 'Total Pedido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'codigoPeriodo',
    name: 'Codigo Periodo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
  {
    key: 'descricaoPeriodo',
    name: 'Descricao Periodo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter
  },
];

export default columns;
