import MultiCheckFilter from '../../../../components/MultiCheckFilter';
import Types from '../../../../utils/filterTypes';

const columns = [
  {
    key: 'estagioComDescricao',
    name: 'Estágio',
    width: 200,
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.TEXT,
    order: 1,
    locked: true
  },
  {
    key: 'quantidadeOrdensAProduzir',
    name: 'OP',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.NUMBER,
    order: 2
  },
  {
    key: 'quantidadePecasAProduzir',
    name: 'Peças',
    filterable: true,
    resizable: true,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.NUMBER,
    //  formatter: NumberFomatter,
    order: 3
  },
  {
    key: 'descricaoAgrupador',
    name: 'Agrupador',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.TEXT,
    order: 4
  },
  {
    key: 'responsavelEstagio',
    name: 'Responsável',
    filterable: true,
    resizable: true,
    width: 150,
    hidden: false,
    sortable: true,
    filterRenderer: MultiCheckFilter,
    type: Types.NUMBER,
    order: 5
  }
];

export default columns;
