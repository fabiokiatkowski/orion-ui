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
    order: 1
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
    key: 'quantidadeProgramado',
    name: 'Programado',
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
    key: 'quantidadeProduzir',
    name: 'Produzir',
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
    key: 'quantidadeProduzida',
    name: 'Produzido',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    formatter: IntegerFormat,
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
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    order: 10
  },
  {
    key: 'quantidadePerda',
    name: 'Perda',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    order: 11
  },
  {
    key: 'quantidadeConserto',
    name: 'Conserto',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.NUMBER,
    formatter: IntegerFormat,
    order: 12
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
    order: 13
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
    formatter: IntegerFormat,
    order: 14
  },
  {
    key: 'nomeTerceiro',
    name: 'Nome Terceiro',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: SuperFilter,
    type: Types.TEXT,
    order: 15
  }
];

export default columns;
