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
    position: 0
  },
  {
    key: 'nivelItem',
    name: 'Nivel',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    position: 1
  },
  {
    key: 'grupoItem',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    position: 2
  },
  {
    key: 'subItem',
    name: 'Sub Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    position: 3,
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
    position: 4
  },
  {
    key: 'descrColecao',
    name: 'Coleção',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    position: 5
  },
  {
    key: 'unidadeMedida',
    name: 'UM',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    position: 6
  },
  {
    key: 'alternativaComp',
    name: 'Alternativa',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    position: 7
  },
  {
    key: 'pecasPrevistas',
    name: 'Vendido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    position: 8
  }
];

export default columns;
