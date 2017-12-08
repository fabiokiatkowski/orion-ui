import React from 'react';
import PropTypes from 'prop-types';

const renderToggleFilterButton = (onToggleFilter) => {
  return (
    <button type="button" className="btn" onClick={onToggleFilter}>
      Filtros
    </button>
  );
};

const Toolbar = (props) => {
  return (
    <div className="react-grid-Toolbar">
      <div className="tools">
        {renderToggleFilterButton(props.onToggleFilter)}
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  onToggleFilter: PropTypes.func.isRequired,
};

export default Toolbar;
