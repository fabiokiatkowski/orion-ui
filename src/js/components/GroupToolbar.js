import React from 'react';
import PropTypes from 'prop-types';
import { ToolsPanel } from 'react-data-grid-addons';

/* WIP */

const onColumnGroupAdded = (colName) => {
  const columnGroups = this.state.groupBy.slice(0);
  const activeColumn = this.state.columnsDef.find((c) => {
    return c.key === colName;
  });
  const isInGroups = columnGroups.some((c) => {
    return activeColumn.key === c.name;
  });
  if (!isInGroups) {
    columnGroups.push({
      key: activeColumn.key,
      name: activeColumn.name
    });
  }

  this.setState({ groupBy: columnGroups });
};

const onColumnGroupDeleted = (colName) => {
  const columnGroups = this.state.groupBy.filter((g) => {
    return typeof g === 'string' ? g !== colName : g.key !== colName;
  });

  this.setState({ groupBy: columnGroups });
};

const onRowExpandToggle = ({ columnGroupName, name, shouldExpand }) => {
  const expandedRows = { ...this.state.expandedRows };
  expandedRows[columnGroupName] = { ...expandedRows[columnGroupName] };
  expandedRows[columnGroupName][name] = { isExpanded: shouldExpand };
  this.setState({ expandedRows });
};

const GroupToolbar = (props) => {
  return (
    <ToolsPanel.ToolBar>
      <ToolsPanel.GroupedColumnsPanels
        groupBy={props.groupBy}
        onColumnGroupAdded={props.onColumnGroupAdded}
        onColumnGroupDeleted={props.onColumnGroupDeleted}
      />
    </ToolsPanel.ToolBar>
  );
};

GroupToolbar.propTypes = {
  groupBy: PropTypes.array.isRequired, // eslint-disable-line
  onColumnGroupAdded: PropTypes.func.isRequired,
  onColumnGroupDeleted: PropTypes.func.isRequired
};

export { onColumnGroupAdded, onColumnGroupDeleted, onRowExpandToggle };
export default GroupToolbar;
