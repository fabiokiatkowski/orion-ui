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
    position: 1
  },
  {
    key: 'grupo',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    position: 2
  },
  {
    key: 'subgrupo',
    name: 'Subgrupo',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    position: 3
  },
  {
    key: 'item',
    name: 'Item',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    position: 4
  },
  {
    key: 'descricao',
    name: 'Descrição',
    filterable: true,
    resizable: true,
    hidden: false,
    type: Types.TEXT,
    position: 5
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
    position: 6
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
    position: 7
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
    position: 8
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
    position: 9
  }
];

export default columns;
