import React from 'react';
import PropTypes from 'prop-types';
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
      <Menu.MenuItem
        onClick={props.openConfig}
      >
        Configurações
      </Menu.MenuItem>
    </Menu.ContextMenu>
  );
};
CustomContextMenu.propTypes = {
  onClearFilters: PropTypes.func.isRequired,
  rowIdx: PropTypes.string.isRequired,
  idx: PropTypes.string.isRequired,
  openConfig: PropTypes.func.isRequired
};

export default CustomContextMenu;
