import React from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
  return (
    <div>
      <Nav>
        <NavDropdown eventKey={1} title="Produção" id="basic-nav-dropdown">
          <MenuItem eventKey={1.1}>
            <NavigationItem link="/tela200">Tela 200</NavigationItem>
          </MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavigationItem
          eventKey={3}
          link="/"
        >ORION USER
        </NavigationItem>
      </Nav>
    </div>
  );
};

export default NavigationItems;
