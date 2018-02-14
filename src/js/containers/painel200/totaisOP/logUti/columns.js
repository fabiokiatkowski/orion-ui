import SuperFilter from '../../../../components/SuperFilter';
import Types from '../../../../utils/filterTypes';

const columns = [
  {
    key: 'dataEntrada',
    name: 'Entrada',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.DATE,
    order: 1
  },
  {
    key: 'usuarioEntrada',
    name: 'Usuário Entrada',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 2
  },
  {
    key: 'dataSaida',
    name: 'Saída',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.DATE,
    order: 3
  },
  {
    key: 'usuarioSaida',
    name: 'Usuário Saída',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 4
  }
];

export default columns;
