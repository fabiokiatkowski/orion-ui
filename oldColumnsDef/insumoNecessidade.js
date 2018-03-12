import Types from '../src/js/utils/filterTypes';
import { SummarySum } from '../src/js/components/Summary';

const columns = [
  {
    key: 'nivel',
    name: 'Nivel',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 1
  },
  {
    key: 'grupo',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 2
  },
  {
    key: 'subgrupo',
    name: 'Subgrupo',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 3
  },
  {
    key: 'item',
    name: 'Item',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 4
  },
  {
    key: 'descricao',
    name: 'Descrição',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    order: 5
  },
  {
    key: 'estoqueAtual',
    name: 'Estoque Global',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    order: 6
  },
  {
    key: 'quantidadeAReceber',
    name: 'A Receber',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    order: 7
  },
  {
    key: 'quantidadeReservada',
    name: 'Reservado',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    order: 8
  },
  {
    key: 'quantidadeReservaGlobal',
    name: 'Reservado Global',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    order: 9
  }
];

export default columns;
