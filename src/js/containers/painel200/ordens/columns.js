import SuperFilter from '../../../components/SuperFilter';
import Types from '../../../utils/filterTypes';
import { SummarySum } from '../../../components/Summary';
import IntegerFormat from '../../../components/NumeralFormat';

const columns = [
  {
    key: 'ordemProducao',
    name: 'OP',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    formatter: IntegerFormat,
    type: Types.NUMBER,
    order: 1
  },
  {
    key: 'ordemPrincipal',
    name: 'OP Pai',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    order: 2
  },
  {
    key: 'referenciaPeca',
    name: 'Grupo',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 3
  },
  {
    key: 'codDesPeriodo',
    name: 'Período',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 4
  },
  {
    key: 'proconfItem',
    name: 'Item',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 5
  },
  {
    key: 'descrColecao',
    name: 'Coleção',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 6
  },
  {
    key: 'descodEstagio',
    name: 'Estágio',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 7
  },
  {
    key: 'tempoDesdeEstagio',
    name: 'Dias',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    order: 8
  },
  {
    key: 'temSus',
    name: 'Tem SUS?',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 9
  },
  {
    key: 'desTipoOrdem',
    name: 'Tipo Ordem',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 10
  },
  {
    key: 'quemCosturou',
    name: 'Quem Costurou',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 11
  },
  {
    key: 'cargaPrograma',
    name: 'Carga Programa',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 12
  },
  {
    key: 'situacao',
    name: 'Situação',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 13
  },
  {
    key: 'minutoCostura',
    name: 'Minuto Costura',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    order: 14
  },
  {
    key: 'desDificuldade',
    name: 'Dificuldade Costura',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 15
  },
  {
    key: 'diasCostura',
    name: 'Dias Costura',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    order: 16
  },
  {
    key: 'descrSerie',
    name: 'Série Tamanho',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 17
  },
  {
    key: 'estacao',
    name: 'Estação',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 18
  },
  {
    key: 'marca',
    name: 'Marca',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 19
  },
  {
    key: 'paiCancelado',
    name: 'OP Pai Cancelado',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 20
  },
  {
    key: 'qtdFilhos',
    name: 'Qtd. Filhos',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    order: 21
  },
  {
    key: 'desOpUti',
    name: 'Tem UTI',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 21
  },
  {
    key: 'desTemLavacao',
    name: 'lavação',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 22
  },
  {
    key: 'qtdeProgramada',
    name: 'Programado',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 23
  },
  {
    key: 'qtdeProduzir',
    name: 'Produzir',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 24
  },
  {
    key: 'qtdeProduzida',
    name: 'Produzida',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    summary: SummarySum,
    order: 25
  }
];

export default columns;
