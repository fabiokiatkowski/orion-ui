export const LIST = 'representante/LIST';

const initialState = {
  data: []
};

const tempData = [
  {
    numeroPedido: 1,
    estado: 'MS',
    situacao: 'indef',
    empresa: 'IN,JF,LM,VV',
    regiao: 'MS - TODO ESTADO',
    codigoRepresentante: 702,
    apelido: 'EDSON ABREU',
    quantidadePedido: 102.0,
    totalPedido: 6379.85,
    codigoPeriodo: 198,
    descricaoPeriodo: 'IN - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'RJ',
    situacao: 'indef',
    empresa: 'IN,JF,LM,VV',
    regiao: 'RJ - TODO INTERIOR',
    codigoRepresentante: 790,
    apelido: 'CLAUDIO.',
    quantidadePedido: 284.0,
    totalPedido: 15479.0,
    codigoPeriodo: 196,
    descricaoPeriodo: 'VV - INVERNO 2018,IN - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'RS',
    situacao: 'indef',
    empresa: 'AM,KE,LB',
    regiao: 'RS - CAPITAL E REGIÃO METROPOLITANA',
    codigoRepresentante: 868,
    apelido: 'RONALDO COIMBRA',
    quantidadePedido: 336.0,
    totalPedido: 16579.29,
    codigoPeriodo: 200,
    descricaoPeriodo: 'LB - INVERNO 2018,KE - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'EX',
    situacao: 'indef',
    empresa: 'AM,IN,JF,KE,LM,VV',
    regiao: 'PARAGUAY',
    codigoRepresentante: 900,
    apelido: 'MARCELO PARAGUAY',
    quantidadePedido: 188.0,
    totalPedido: 9949.89,
    codigoPeriodo: 199,
    descricaoPeriodo: 'JF - INVERNO 2018,VV - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'PR',
    situacao: 'indef',
    empresa: 'IN,JF,LM,VV',
    regiao: 'PR - SUDOESTE',
    codigoRepresentante: 903,
    apelido: 'SIBELE ',
    quantidadePedido: 953.0,
    totalPedido: 67148.27,
    codigoPeriodo: 198,
    descricaoPeriodo: 'IN - INVERNO 2018,VV - INVERNO 2018,LM - INVERNO 2018,JF - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'SP',
    situacao: 'indef',
    empresa: 'AM,KE,LB',
    regiao: 'SP - ZONA LESTE E SUL, BRAS,  BOM RETIRO, EMBU, MOGI',
    codigoRepresentante: 921,
    apelido: 'JOAO VICTOR',
    quantidadePedido: 107.0,
    totalPedido: 6817.85,
    codigoPeriodo: 201,
    descricaoPeriodo: 'KE - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'PE',
    situacao: 'indef',
    empresa: 'IN,JF,LM,VV',
    regiao: 'PE - TODO ESTADO',
    codigoRepresentante: 945,
    apelido: 'GUSTAVO -  PE',
    quantidadePedido: 494.0,
    totalPedido: 28620.78,
    codigoPeriodo: 197,
    descricaoPeriodo: 'LM - INVERNO 2018,IN - INVERNO 2018,VV - INVERNO 2018,JF - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'BA',
    situacao: 'indef',
    empresa: 'AM,KE,LB',
    regiao: 'BA - NORTE E SALVADOR E RECONCAVO',
    codigoRepresentante: 956,
    apelido: 'EMERSON ALVES',
    quantidadePedido: 216.0,
    totalPedido: 12709.66,
    codigoPeriodo: 201,
    descricaoPeriodo: 'KE - INVERNO 2018,LB - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'MT',
    situacao: 'indef',
    empresa: 'AM,KE,LB',
    regiao: 'MT - TODO ESTADO',
    codigoRepresentante: 963,
    apelido: 'REGINALDO MAGALHAES',
    quantidadePedido: 235.0,
    totalPedido: 11873.4,
    codigoPeriodo: 201,
    descricaoPeriodo: 'KE - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'SP',
    situacao: 'indef',
    empresa: 'AM,KE,LB',
    regiao: 'SP -BAIXO TIETE',
    codigoRepresentante: 964,
    apelido: 'ALEXANDRE FERREIRA',
    quantidadePedido: 397.0,
    totalPedido: 18755.57,
    codigoPeriodo: 201,
    descricaoPeriodo: 'KE - INVERNO 2018,LB - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'MS',
    situacao: 'indef',
    empresa: 'AM,KE,LB',
    regiao: 'MS - TODO ESTADO',
    codigoRepresentante: 968,
    apelido: 'GLAUCIO',
    quantidadePedido: 251.0,
    totalPedido: 12576.31,
    codigoPeriodo: 201,
    descricaoPeriodo: 'KE - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'RN',
    situacao: '',
    empresa: 'AM,KE,LB',
    regiao: 'RN - TODO ESTADO',
    codigoRepresentante: 977,
    apelido: 'KARINA',
    quantidadePedido: 154.0,
    totalPedido: 6959.29,
    codigoPeriodo: 201,
    descricaoPeriodo: 'KE - INVERNO 2018,LB - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'BA',
    situacao: '',
    empresa: 'AM,KE,LB',
    regiao: 'BA - SUL DO ESTADO',
    codigoRepresentante: 978,
    apelido: 'KAIKE',
    quantidadePedido: 657.0,
    totalPedido: 41364.6,
    codigoPeriodo: 201,
    descricaoPeriodo: 'KE - INVERNO 2018,LB - INVERNO 2018'
  },
  {
    numeroPedido: 1,
    estado: 'RS',
    situacao: '',
    empresa: 'AM,KE,LB',
    regiao: 'RS - MISSOES E PLANALTO NORTE',
    codigoRepresentante: 993,
    apelido: 'PABLO',
    quantidadePedido: 347.0,
    totalPedido: 15450.13,
    codigoPeriodo: 201,
    descricaoPeriodo: 'KE - INVERNO 2018'
  }
];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LIST: {
      return { ...state, data: action.data };
    }
    default:
      return state;
  }
}

export function list() {
  return (dispatch) => {
    dispatch({
      type: LIST,
      data: tempData
    });
  };
}

export function listByDate(dateFilter) {
  return (dispatch) => {
    fetch(`http://192.168.0.193:8080/api/representantes/mysql/totalPedidosRecebidos/datafiltro/${dateFilter}`)
      .then(response => response.json())
      .then(data => dispatch({
        type: LIST,
        data
      }));
  };
}
