import Types from '../src/js/utils/filterTypes';

const columns = [
  {
    key: 'referencia',
    name: 'Referencia',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 0
  },
  {
    key: 'nivelItem',
    name: 'Nivel',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    order: 1
  },
  {
    key: 'grupoItem',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 2
  },
  {
    key: 'subItem',
    name: 'Sub Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    order: 3,
    type: Types.TEXT
  },
  {
    key: 'itemItem',
    name: 'Item',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 4
  },
  {
    key: 'descrColecao',
    name: 'Coleção',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 5
  },
  {
    key: 'unidadeMedida',
    name: 'UM',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 6
  },
  {
    key: 'alternativaComp',
    name: 'Alternativa',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    order: 7
  },
  {
    key: 'pecasPrevistas',
    name: 'Vendido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    order: 8
  }
];

export default columns;
