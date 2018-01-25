import Types from '../../utils/filterTypes';
import { SummarySum } from '../../components/Summary';
import IntegerFormat from '../../components/NumeralFormat';

const columns = [
  {
    key: 'nivel',
    name: 'Nivel',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 1,
    locked: true
  },
  {
    key: 'grupo',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 2,
    locked: true
  },
  {
    key: 'subgrupo',
    name: 'Subgrupo',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 3,
    locked: true
  },
  {
    key: 'item',
    name: 'Item',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 4,
    locked: true
  },
  {
    key: 'descricao',
    name: 'Descrição',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 5,
    locked: true
  },
  {
    key: 'estoqueAtual',
    name: 'Estoque Global',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 6,
    locked: true
  },
  {
    key: 'quantidadeAReceber',
    name: 'A Receber',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 7,
    locked: true
  },
  {
    key: 'quantidadeReservada',
    name: 'Reservado',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 8,
    locked: true
  },
  {
    key: 'quantidadeReservaGlobal',
    name: 'Reservado Global',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 9,
    locked: true
  }
];

export default columns;
