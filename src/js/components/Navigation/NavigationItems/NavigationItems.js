import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import NavigationItem from './NavigationItem/NavigationItem';
import { logOut } from '../../../redux/modules/session';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logOut: bindActionCreators(logOut, dispatch)
});

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
        <NavDropdown
          eventKey={3}
          title={props.currentUser && props.currentUser.apelido}
          id="basic-nav-dropdown"
        >
          <MenuItem
            eventKey={3.1}
            onClick={() => props.logOut()}
          >
            Sair
          </MenuItem>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
