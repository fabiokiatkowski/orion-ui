import Types from '../src/js/utils/filterTypes';
import { SummarySum } from '../src/js/components/Summary';

const columns = [
  {
    key: 'codigoSUS',
    name: 'Código S.U.S',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    type: Types.NUMBER,
    order: 1
  },
  {
    key: 'situacao',
    name: 'Situação',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 2
  },
  {
    key: 'usuario',
    name: 'Usuário',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 3
  },
  {
    key: 'dataCorte',
    name: 'Data Corte',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATE,
    order: 4
  },
  {
    key: 'dataSolicitacao',
    name: 'Data Solicitação',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATE,
    order: 5
  },
  {
    key: 'referencia',
    name: 'Referência',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 6
  },
  {
    key: 'nivel',
    name: 'Nível',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 6
  },
  {
    key: 'grupo',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 7
  },
  {
    key: 'subgrupo',
    name: 'Subgrupo',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 8
  },
  {
    key: 'item',
    name: 'Item',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 9
  },
  {
    key: 'descricao',
    name: 'Descrição',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 10
  },
  {
    key: 'complemento',
    name: 'Complemento',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 11
  },
  {
    key: 'unidadeMedida',
    name: 'UM',
    filterable: true,
    resizable: true,
    width: 100,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 12
  },
  {
    key: 'qtdeNecessaria',
    name: 'Qtd. Nec.',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    summary: SummarySum,
    formatter_index: 1,
    order: 13
  },
  {
    key: 'ordemProducao',
    name: 'Ordem Produção',
    filterable: true,
    resizable: true,
    width: 200,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    order: 14
  },
  {
    key: 'pedidoCompra',
    name: 'Pedido Compra',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    order: 15
  },
  {
    key: 'dataEmissaoCorte',
    name: 'Data Emissão O.C.',
    filterable: true,
    resizable: true,
    width: 250,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    order: 16
  },
  {
    key: 'fornecedor',
    name: 'Fornecedor Pedido',
    filterable: true,
    resizable: true,
    width: 450,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 17
  },
  {
    key: 'qtdePedidoAtual',
    name: 'Qtd. Pedido Atual',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    order: 18
  },
  {
    key: 'periodoProducao',
    name: 'Período Produção',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    order: 19
  },
  {
    key: 'previsao1',
    name: 'Previsão 1',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATE,
    order: 20
  },
  {
    key: 'previsao2',
    name: 'Previsão 2',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATE,
    order: 21
  },
  {
    key: 'previsao3',
    name: 'Previsão 3',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATE,
    order: 22
  },
  {
    key: 'fornecedorUltNF',
    name: 'Fornecedor Ult. N.F.',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    order: 23
  },
  {
    key: 'dataUltNF',
    name: 'Data Ult. N.F.',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATE,
    order: 24
  },
  {
    key: 'qtdeUltNF',
    name: 'Qtd. Ult. N.F.',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    order: 25
  },
  {
    key: 'vlrUltNF',
    name: 'Vlr. Ult. N.F.',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    summary: SummarySum,
    formatter_index: 1,
    order: 26
  }
];

export default columns;
