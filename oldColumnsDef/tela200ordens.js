import Types from '../src/js/utils/filterTypes';
import { SummarySum } from '../src/js/components/Summary';

const columns = [
  {
    key: 'ordemProducao',
    name: 'OP',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    formatter_index: 1,
    type: Types.NUMBER,
    position: 1
  },
  {
    key: 'ordemPrincipal',
    name: 'OP Pai',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.NUMBER,
    formatter_index: 1,
    position: 2
  },
  {
    key: 'referenciaPeca',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.TEXT,
    position: 3
  },
  {
    key: 'codDesPeriodo',
    name: 'Período',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.TEXT,
    position: 4
  },
  {
    key: 'proconfItem',
    name: 'Item',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.TEXT,
    position: 5
  },
  {
    key: 'descrColecao',
    name: 'Coleção',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.TEXT,
    position: 6
  },
  {
    key: 'descodEstagio',
    name: 'Estágio',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    type: Types.TEXT,
    position: 7
  },
  {
    key: 'tempoDesdeEstagio',
    name: 'Dias',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.NUMBER,
    formatter_index: 1,
    position: 8
  },
  {
    key: 'temSus',
    name: 'Tem SUS?',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.TEXT,
    position: 9
  },
  {
    key: 'desTipoOrdem',
    name: 'Tipo Ordem',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.TEXT,
    position: 10
  },
  {
    key: 'quemCosturou',
    name: 'Quem Costurou',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.TEXT,
    position: 11
  },
  {
    key: 'cargaPrograma',
    name: 'Carga Programa',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.TEXT,
    position: 12
  },
  {
    key: 'situacao',
    name: 'Situação',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.TEXT,
    position: 13
  },
  {
    key: 'minutoCostura',
    name: 'Minuto Costura',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,
    type: Types.NUMBER,
    formatter_index: 1,
    position: 14
  },
  {
    key: 'desDificuldade',
    name: 'Dificuldade Costura',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 15
  },
  {
    key: 'diasCostura',
    name: 'Dias Costura',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    position: 16
  },
  {
    key: 'descrSerie',
    name: 'Série Tamanho',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 17
  },
  {
    key: 'estacao',
    name: 'Estação',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 18
  },
  {
    key: 'marca',
    name: 'Marca',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 19
  },
  {
    key: 'paiCancelado',
    name: 'OP Pai Cancelado',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 20
  },
  {
    key: 'qtdFilhos',
    name: 'Qtd. Filhos',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    position: 21
  },
  {
    key: 'desOpUti',
    name: 'Tem UTI',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 21
  },
  {
    key: 'desTemLavacao',
    name: 'lavação',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 22
  },
  {
    key: 'qtdeProgramada',
    name: 'Programado',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    position: 23
  },
  {
    key: 'qtdeProduzir',
    name: 'Produzir',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    position: 24
  },
  {
    key: 'qtdeProduzida',
    name: 'Produzida',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    position: 25
  },
  {
    key: 'qtdeSegunda',
    name: 'Qtde. Segunda',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    position: 26
  },
  {
    key: 'qtdePerda',
    name: 'Qtde. Perda',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    position: 27
  },
  {
    key: 'qtdeConserto',
    name: 'Qtde. Conserto',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    position: 28
  },
  {
    key: 'qtdePendente',
    name: 'Qtde. Pendente',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    summary: SummarySum,
    position: 29
  },
  {
    key: 'artigoCotas',
    name: 'Artigo de Cotas',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 30
  },
  {
    key: 'opMesmaRefCor',
    name: 'OP. mesma Ref/Cor',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 31
  },
  {
    key: 'cancelouOp',
    name: 'Cancelou OP',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.TEXT,
    position: 32
  },
  {
    key: 'ordemServicoCostura',
    name: 'Ordem de Serviço de Costura',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.NUMBER,
    formatter_index: 1,
    position: 33
  },
  {
    key: 'ordemServiço',
    name: 'Ordem de Serviço',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,

    type: Types.NUMBER,
    position: 34
  },
  {
    key: 'nomeServicoEstagi',
    name: 'Nome Terceiro',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 35
  },
  {
    key: 'dataEmissaoOs',
    name: 'Data Emissão',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATE,
    position: 36
  },
  {
    key: 'dataPrevisaoOS',
    name: 'Data Previsão',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATA,
    position: 37
  },
  {
    key: 'dataProrrogacaoOS',
    name: 'Data Prorrogação',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATA,
    position: 38
  },
  {
    key: 'desCodfamilia',
    name: 'Des. Família',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 39
  },
  {
    key: 'responsavel',
    name: 'Responsável',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 40
  },
  {
    key: 'dataPrimBixaUltEst',
    name: 'Data Prim. Baixa Ult. Est.',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.DATE,
    position: 41
  },
  {
    key: 'semRoteiroCostura',
    name: 'Sem Roteiro Costura',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 42
  },
  {
    key: 'reservaZerada',
    name: 'Reserva Zerada',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    draggable: true,

    type: Types.TEXT,
    position: 43
  }
];

export default columns;
