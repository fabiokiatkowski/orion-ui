import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel } from 'react-bootstrap';

const OrdemProducaoField = (props) => {
  const onChangeHandler = (e, fn) => {
    const regexp = /^\d+$/;
    const v = e.target.value;
    return regexp.test(v) || v === '' ? fn(v) : false;
  };
  return (
    <FormControl
      bsClass="form-control ordem-producao field"
      name="ordemProducao"
      id="ordemProducao"
      maxLength="9"
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={e => onChangeHandler(e, props.onChange)}
    />
  );
};
OrdemProducaoField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};
OrdemProducaoField.defaultProps = {
  placeholder: 'Ordem Prod.',
  value: '',
  onChange: () => {}
};

export default OrdemProducaoField;
