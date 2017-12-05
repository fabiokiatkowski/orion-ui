import React from 'react';
import PropTypes from 'prop-types';

const SearchField = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <form className="navbar-form navbar-left">
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">
              <span className="glyphicon glyphicon-search" />
            </span>
            <input
              type="text"
              value={props.searchString}
              onChange={props.onChange}
              className="form-control"
              placeholder="Codigo Usuário"
              aria-describedby="basic-addon1"
            />
          </div>
          <p>{props.searchString}</p>
        </form>
      </div>
    </nav>
  );
};

SearchField.propTypes = {
  searchString: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchField;
