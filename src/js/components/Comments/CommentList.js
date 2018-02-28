import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import Grid from '../Grid';

const commentList = (props) => {
  return (
    <Form inline>
      <FormGroup bsClass="form-group grid-observacao">
        <Grid
          minHeight={161}
          columns={props.columns}
          data={props.data}
          handleRowChange={props.onRowChange}
        />
      </FormGroup>
      <FormGroup bsClass="form-group observacao-2">
        <FormControl
          rows={8}
          componentClass="textarea"
          id="observacao-2"
          value={props.commentText}
        />
      </FormGroup>
    </Form>
  );
};

commentList.propTypes = {
  commentText: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowChange: PropTypes.func
};

commentList.defaultProps = {
  commentText: '',
  onRowChange: () => {}
};

export default commentList;
