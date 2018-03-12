import Types from '../src/js/utils/filterTypes';

const columns = [
  {
    key: 'dataEntrada',
    name: 'Entrada',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.DATE,
    position: 1
  },
  {
    key: 'usuarioEntrada',
    name: 'Usuário Entrada',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.TEXT,
    position: 2
  },
  {
    key: 'dataSaida',
    name: 'Saída',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.DATE,
    position: 3
  },
  {
    key: 'usuarioSaida',
    name: 'Usuário Saída',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.TEXT,
    position: 4
  }
];

export default columns;
