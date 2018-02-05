import React from 'react';
import PropTypes from 'prop-types';
// import ReactDataGrid from 'react-data-grid';
import { Menu } from 'react-data-grid-addons';

const CustomContextMenu = (props) => {
  return (
    <Menu.ContextMenu>
      <Menu.MenuItem
        data={{ rowIdx: props.rowIdx, idx: props.idx }}
        onClick={props.onClearFilters}
      >
        Limpar Filtros
      </Menu.MenuItem>
    </Menu.ContextMenu>
  );
};
CustomContextMenu.propTypes = {
  onClearFilters: PropTypes.func.isRequired,
  rowIdx: PropTypes.string.isRequired,
  idx: PropTypes.string.isRequired
};

export default CustomContextMenu;
