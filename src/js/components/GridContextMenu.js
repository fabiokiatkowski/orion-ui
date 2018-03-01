import React from 'react';
import PropTypes from 'prop-types';
import { ReactPageClick } from 'react-page-click';

const GridContextMenu = (props) => {
  const style = {
    position: 'fixed',
    top: `${props.screenY - 90}px`,
    left: `${props.screenX}px`,
  };

  const handleClick = (e, action) => {
    action(e);
    props.onClose();
  };

  return (
    <ReactPageClick notify={props.onClose}>
      <div style={style} className="grid-context-menu">
        <div
          className="grid-context-menu-action"
          onClick={e => handleClick(e, props.onClearFilters)}
        >
          Limpar Filtros
        </div>
        <div
          className="grid-context-menu-action"
          onClick={e => handleClick(e, props.openConfig)}
        >
          Configurações
        </div>
      </div>
    </ReactPageClick>
  );
};

GridContextMenu.propTypes = {
  onClearFilters: PropTypes.func.isRequired,
  openConfig: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default GridContextMenu;
