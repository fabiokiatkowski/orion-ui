import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import PanelRepresentantes from '../containers/PanelRepresentantes';

const Header = (props) => {
  return (
    <div>
      <Navbar inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Orion Xp</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              <Link to="/foo">Foo</Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to="/bar">Bar</Link>
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>
                <Link to="/action">Action</Link>
              </MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={4} title="Vendas" id="basic-nav-dropdown">
              <MenuItem eventKey={4.1}>
                <Link to="painelRepresentantes">
                  Painel Representantes
                </Link>
              </MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">User {props.currentUser.foo}</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <Route exact path="/" component={PanelRepresentantes} />
        <Route exact path="/painelRepresentantes" component={PanelRepresentantes} />
      </main>
    </div>
  );
};

Header.propTypes = {
  currentUser: PropTypes.shape({
    foo: React.PropTypes.string
  })
};

Header.defaultProps = {
  currentUser: { foo: 'teste' }
};

export default Header;
