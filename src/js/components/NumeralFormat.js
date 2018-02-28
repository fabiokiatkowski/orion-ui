import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const IntegerFormat = (props) => {
  const v = props.value || 0;
  const showDecimal = v % 1 !== 0;
  return (
    <div className="numeral">
      <NumberFormat
        displayType="text"
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={(showDecimal) ? 3 : 0}
        fixedDecimalScale={showDecimal}
        value={v}
      />
    </div>
  );
};

IntegerFormat.propTypes = {
  value: PropTypes.number
};

IntegerFormat.defaultProps = {
  value: null
};

export default IntegerFormat;
