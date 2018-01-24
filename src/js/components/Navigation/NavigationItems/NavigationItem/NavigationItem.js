import React from 'react';
import PropTypes from 'prop-types';
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
  exact: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.string
};

NavigationItem.defaultProps = {
  exact: false,
  link: '/',
  children: 'Link to...'
};

export default NavigationItem;
