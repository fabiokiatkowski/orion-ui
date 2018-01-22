import React from 'react';
import PropsTypes from 'prop-types';
import { NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
  return (
    <NavItem>
      <NavLink
        exact={props.exact}
        to={props.link}
      >{props.children}
      </NavLink>
    </NavItem>
  );
};

NavigationItem.propTypes = {
  exact: PropsTypes.bool,
  link: PropsTypes.string,
  children: PropsTypes.string
};

NavigationItem.defaultProps = {
  exact: false,
  link: '/',
  children: 'Link to...'
};

export default NavigationItem;
