import React from 'react';

import Grid from '../../components/Grid';
import columns from './columnsRolos';

const InsumoDeposito = (props) => {
  return (
    <div className="rolo">
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
