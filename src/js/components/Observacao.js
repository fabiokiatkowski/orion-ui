import React, { Component } from 'react';
import Types from '../utils/filterTypes';
import Grid from './Grid';

const columns = [
  {
    key: 'data',
    name: 'Data',
    filterable: true,
    resizable: true,
    sortable: false,
    type: Types.DATE,
    order: 1,
  },
  {
    key: 'usuario',
    name: 'Usuario',
    filterable: true,
    resizable: true,
    sortable: false,
    type: Types.TEXT,
    order: 2,
  },
  {
    key: 'estagio',
    name: 'Estagio',
    filterable: true,
    resizable: true,
    sortable: false,
    type: Types.TEXT,
    order: 3,
  }
];

// class Observacao extends Component {
//   render() {
//     return (
//       <div className="observacao-wrapper">
//         <div class="form-group">
//           <textarea className="form-control" rows="5" id="comment" />
//         </div>
//       </div>
//     );
//   }
// }

const Observacao = (props) => {
  return (
    <div className="observacao-wrapper">
      <div className="form-inline">
        <div className="form-group observacao">
          <textarea
            className="form-control"
            rows="2"
            id="observacao"
          />
        </div>
        <div className="form-group save-button">
          <button className="btn btn-primary">Salvar</button>
        </div>
      </div>
      <div className="form-inline">
        <div className="form-group grid-observacao">
          <Grid
            minHeight={161}
            columns={columns}
            data={[{}]}
          />
        </div>
        <div className="form-group observacao-2">
          <textarea
            className="form-control"
            rows="8"
            id="observacao-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Observacao;
