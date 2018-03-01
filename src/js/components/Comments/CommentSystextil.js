import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const commentSystextil = (props) => {
  return (
    <FormControl
      rows={8}
      componentClass="textarea"
      id="observacao-2"
      value={props.commentText}
      readOnly
    />
  );
};

commentSystextil.propTypes = {
  commentText: PropTypes.string
};
commentSystextil.defaultProps = {
  commentText: ''
};

export default commentSystextil;
