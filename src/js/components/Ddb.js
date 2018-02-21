import React from 'react';
import VirtualList from 'react-virtual-list';
import PropTypes from 'prop-types';

const DropdownBody = (props) => {
  const renderItem = (item, idx) => {
    console.log(item);
    const render = props.renderItem;
    return (
      <li key={idx}>{render(item, idx)}</li>
    );
  };
  const { virtual } = props;
  console.log(virtual);
  return (
    <div className="dropdown-portal-body">
      {virtual.items &&
        <ul>
          {virtual.items.map(renderItem)}
        </ul>
      }
      {props.children}
    </div>
  );
};

export default VirtualList()(DropdownBody);
