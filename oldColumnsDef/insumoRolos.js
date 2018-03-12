import Types from '../src/js/utils/filterTypes';
import { SummarySum } from '../src/js/components/Summary';

const columns = [
  {
    key: 'codigoRolo',
    name: 'Rolo',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    order: 1
  },
  {
    key: 'numeroLote',
    name: 'Lote',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 2
  },
  {
    key: 'pesoRolo',
    name: 'Quantidade',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    order: 3
  },
  {
    key: 'periodoProducao',
    name: 'Período',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    order: 4
  },
  {
    key: 'desOP',
    name: 'OP Reserva',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 5
  },
  {
    key: 'estagioOP',
    name: 'Estagio',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 6
  }
];

export default columns;
