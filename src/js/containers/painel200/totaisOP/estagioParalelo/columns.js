import SuperFilter from '../../../../components/SuperFilter';
import Types from '../../../../utils/filterTypes';
import IntegerFormat from '../../../../components/NumeralFormat';

const columns = [
  {
    key: 'periodoProducao',
    name: 'Período',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    order: 1,
    locked: true
  },
  {
    key: 'ordemProducao',
    name: 'Ordem Produção',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
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
    filterRenderer: SuperFilter,
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
    filterRenderer: SuperFilter,
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
    filterRenderer: SuperFilter,
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
    filterRenderer: SuperFilter,
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
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
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
    order: 8
  },
  {
    key: 'ordemServico',
    name: 'Ordem Serviço',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
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
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 10
  }
];

export default columns;
