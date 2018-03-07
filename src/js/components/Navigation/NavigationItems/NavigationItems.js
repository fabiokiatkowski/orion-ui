import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
          <MenuItem eventKey={1.2} title="Consultar Avance">
            <NavigationItem link="/avance">Consultar Avance</NavigationItem>
          </MenuItem>
          <MenuItem eventKey={1.3} title="Visualizador">
            <NavigationItem link="/visualizador">Visualizador</NavigationItem>
          </MenuItem>
        </NavDropdown>
        <NavDropdown eventKey={2} title="Suprimentos" id="suprimento-nav-dropdown">
          <MenuItem eventKey={1.1}>
            <NavigationItem link="/sus">Solicitação Urgente de Suprimentos</NavigationItem>
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

NavigationItems.propTypes = {
  logOut: PropTypes.func.isRequired,
  currentUser: PropTypes.any,
};
NavigationItems.defaultProps = {
  currentUser: null
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
