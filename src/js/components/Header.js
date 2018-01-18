import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import PanelRepresentantes from '../containers/PanelRepresentantes';
import PainelEstagiosAbertos from '../containers/painel200/PainelEstagiosAbertos';

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
            <NavItem eventKey={3}>
              <Link to="/tela200">Tela 200</Link>
            </NavItem>
            <NavDropdown eventKey={4} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={4.1}>
                <Link to="/action">Action</Link>
              </MenuItem>
              <MenuItem eventKey={4.2}>Another action</MenuItem>
              <MenuItem eventKey={4.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={4.3}>Separated link</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={5} title="Vendas" id="basic-nav-dropdown">
              <MenuItem eventKey={5.1}>
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
        <Route exact path="/" render={() => <div />} />
        <Route exact path="/tela200" component={PainelEstagiosAbertos} />
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
