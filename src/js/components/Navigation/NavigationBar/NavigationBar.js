import React from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';

const NavigationBar = () => {
  return (
    <div>
      <Navbar collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/">Orion Xp</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <NavigationItems />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
