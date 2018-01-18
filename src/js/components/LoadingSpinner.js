import React, { Component, PropTypes } from 'react';
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

export default LoadingSpinner;
