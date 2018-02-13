import SuperFilter from '../../components/SuperFilter';
import Types from '../../utils/filterTypes';

const columns = [
  {
    key: 'nivel_estrutura',
    name: 'Nivel',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 0
  },
  {
    key: 'grupo_estrutura',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 1
  },
  {
    key: 'subgru_estrutura',
    name: 'Sub Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    order: 2,
    type: Types.TEXT
  },
  {
    key: 'item_estrutura',
    name: 'Item',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 3
  },
  {
    key: 'descricao',
    name: 'Descrição',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 4
  },
  {
    key: 'complemento',
    name: 'Complemento',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 5
  },
  {
    key: 'qtde_areceber',
    name: 'Quantidade a receber',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 6
  },
  {
    key: 'qtde_reservado',
    name: 'Quantidade reservado',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 7
  },
  {
    key: 'qtde_estq_tmrp',
    name: 'Quantidade estoque tmrp',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 8
  },
  {
    key: 'qtde_estq_global',
    name: 'Quantidade estoque global',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 9
  }
];

export default columns;
