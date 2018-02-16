import React from 'react';
import columns from './columns';
import Grid from '../../../components/Grid';

const OndeUsaGrid = () => {
  return (
    <Grid
      minHeight={500}
      columns={columns}
      data={[]}
      handleRowChange={() => {}}
    />
  );
};

export default OndeUsaGrid;
