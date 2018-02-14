import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import NavigationBar from '../../components/Navigation/NavigationBar/NavigationBar';
import LoadingSpinner from '../../components/LoadingSpinner';
import * as session from '../../redux/modules/session';

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  currentUser: state.session.currentUser,
  pathname: state.routing.location.pathname
});

class Layout extends Component {
  componentDidMount() {
    this.checkUser();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      this.checkUser();
    }
  }

  checkUser = () => {
    const { dispatch, currentUser } = this.props;
    if (localStorage.getItem('orion.authToken')) {
      console.log(localStorage.getItem('orion.authToken'));
      dispatch(session.currentUser());
    } else {
      console.log("why?")
      dispatch(push('/signIn'));
    }
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <LoadingSpinner isLoading={this.props.isLoading}>
          <main>
            {this.props.children}
          </main>
        </LoadingSpinner>
        <footer id="footer" >
          <b>Copyright © 2018 <a href="http://www.pacificosul.com.br/novo/">Pacifico Sul</a></b>.
          <span className="is-hidden-mobile">Todos os direitos reservados.</span>
        </footer>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  isLoading: PropTypes.bool
};

Layout.defaultProps = {
  isLoading: false
};

export default connect(mapStateToProps, null)(Layout);
