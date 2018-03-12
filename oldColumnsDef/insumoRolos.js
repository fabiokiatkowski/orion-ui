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
    position: 1
  },
  {
    key: 'numeroLote',
    name: 'Lote',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    position: 2
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
    position: 3
  },
  {
    key: 'periodoProducao',
    name: 'Período',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    position: 4
  },
  {
    key: 'desOP',
    name: 'OP Reserva',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    position: 5
  },
  {
    key: 'estagioOP',
    name: 'Estagio',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    position: 6
  }
];

export default columns;
