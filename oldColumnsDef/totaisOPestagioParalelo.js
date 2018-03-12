import Types from '../src/js/utils/filterTypes';

const columns = [
  {
    key: 'periodoProducao',
    name: 'Período',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    order: 1
  },
  {
    key: 'ordemProducao',
    name: 'Ordem Produção',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    order: 2
  },
  {
    key: 'grupo',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 3
  },
  {
    key: 'item',
    name: 'Item',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 4
  },
  {
    key: 'codigoEstagio',
    name: 'Código Estágio',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    order: 5
  },
  {
    key: 'descricaoEstagio',
    name: 'Desc. Estágio',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 6
  },
  {
    key: 'quantidadePendente',
    name: 'Pendente',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    order: 7
  },
  {
    key: 'tempoDesdeEstagio',
    name: 'Dias',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    order: 8
  },
  {
    key: 'ordemServico',
    name: 'Ordem Serviço',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    formatter_index: 1,
    type: Types.NUMBER,
    order: 9
  },
  {
    key: 'nomeTerceiro',
    name: 'Desc. Estágio',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 10
  }
];

export default columns;
