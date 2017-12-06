import React from 'react';
import PropTypes from 'prop-types';

const Toolbar = (props) => {
  return (
    <div className="box">
      <button type="button" className="btn" onClick={props.onToggleFilter} />
    </div>
  );
};

Toolbar.propTypes = {
  onToggleFilter: PropTypes.func.isRequired,
};

export default Toolbar;
