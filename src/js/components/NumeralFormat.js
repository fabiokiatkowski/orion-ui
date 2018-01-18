import React from 'react';
import NumberFormat from 'react-number-format';

const IntegerFormat = (props) => {
  const v = (props.valor?props.valor:props.value);
  const showDecimal = v % 1 !== 0;
  return (
    <div className="numeral">
      <NumberFormat
        displayType="text"
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={(showDecimal) ? 2 : 0}
        fixedDecimalScale={showDecimal}
        value={v}
      />
    </div>
  );
};

export default IntegerFormat;
