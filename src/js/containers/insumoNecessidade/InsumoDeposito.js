import React from 'react';

import Grid from '../../components/Grid';
import columns from './columnsDeposito';

const InsumoDeposito = (props) => {
  return (
    <div className="deposito">
      <Grid
        minHeight={150}
        columns={columns}
        data={props.data}
        indexes={[]}
        handleRowChange={props.handleRowChange}
      />
    </div>
  );
};

export default InsumoDeposito;
