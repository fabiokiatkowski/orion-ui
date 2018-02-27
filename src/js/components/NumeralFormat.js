import React from 'react';
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

export default IntegerFormat;
