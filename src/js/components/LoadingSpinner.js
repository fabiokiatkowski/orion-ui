import React from 'react';
import PropTypes from 'prop-types';
import joinClasses from 'classnames';

const LoadingSpinner = (props) => {
  const loadingStyle = joinClasses({
    'loading-indicator': true,
    visible: props.isLoading,
  });
  const overlayStyle = joinClasses({
    overlay: true,
    visible: props.isLoading,
    center: true
  });
  return (
    <div className={loadingStyle}>
      <div className={overlayStyle} />
      {props.children}
    </div>
  );
};

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any.isRequired
};

LoadingSpinner.defaultProps = {
  isLoading: false
};

export default LoadingSpinner;
