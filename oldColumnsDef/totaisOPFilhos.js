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
    key: 'quantidadeProgramado',
    name: 'Programado',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    order: 7
  },
  {
    key: 'quantidadeProduzir',
    name: 'Produzir',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    order: 8
  },
  {
    key: 'quantidadeProduzida',
    name: 'Produzido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    formatter_index: 1,
    type: Types.NUMBER,
    order: 9
  },
  {
    key: 'quantidadeSegunda',
    name: 'Segunda',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    order: 10
  },
  {
    key: 'quantidadePerda',
    name: 'Perda',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    order: 11
  },
  {
    key: 'quantidadeConserto',
    name: 'Conserto',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    order: 12
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
    order: 13
  },
  {
    key: 'ordemServico',
    name: 'Ordem Serviço',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    order: 14
  },
  {
    key: 'nomeTerceiro',
    name: 'Nome Terceiro',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    order: 15
  }
];

export default columns;
