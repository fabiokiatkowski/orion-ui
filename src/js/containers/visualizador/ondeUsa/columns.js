import SuperFilter from '../../../components/SuperFilter';
import Types from '../../../utils/filterTypes';

const columns = [
  {
    key: 'referencia',
    name: 'Referencia',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 0
  },
  {
    key: 'nivel_item',
    name: 'Nivel',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 1
  },
  {
    key: 'grupo_item',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 2
  },
  {
    key: 'sub_item',
    name: 'Sub Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    order: 3,
    type: Types.TEXT
  },
  {
    key: 'item_item',
    name: 'Item',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 4
  },
  {
    key: 'descr_colecao',
    name: 'Coleção',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 5
  },
  {
    key: 'unidade_medida',
    name: 'UM',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 6
  },
  {
    key: 'alternativa_comp',
    name: 'Alternativa',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 7
  },
  {
    key: 'pecas_previstas',
    name: 'Vendido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 8
  }
];

export default columns;
