import Types from '../../utils/filterTypes';
import { SummarySum } from '../../components/Summary';
import IntegerFormat from '../../components/NumeralFormat';

const columns = [
  {
    key: 'codigoRolo',
    name: 'Rolo',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    order: 1,
    locked: true
  },
  {
    key: 'lote',
    name: 'Lote',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 2,
    locked: true
  },
  {
    key: 'quantidade',
    name: 'Quantidade',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 3,
    locked: true
  },
  {
    key: 'periodo',
    name: 'Período',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    order: 4,
    locked: true
  },
  {
    key: 'opReserva',
    name: 'OP Reserva',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 5,
    locked: true
  },
  {
    key: 'estagioConcat',
    name: 'Período',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 6,
    locked: true
  }
];

export default columns;
