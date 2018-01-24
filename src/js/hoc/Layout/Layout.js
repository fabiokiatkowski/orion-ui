import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../../components/Navigation/NavigationBar/NavigationBar';
import LoadingSpinner from '../../components/LoadingSpinner';

const mapStateToProps = state => ({
  isLoading: state.app.isLoading
});

const Layout = (props) => {
  return (
    <div>
      <NavigationBar />
      <LoadingSpinner isLoading={props.isLoading}>
        <main>
          {props.children}
        </main>
      </LoadingSpinner>
      <footer id="footer" >
        <b>Copyright © 2018 <a href="http://www.pacificosul.com.br/novo/">Pacifico Sul</a></b>.
        <span className="is-hidden-mobile">Todos os direitos reservados.</span>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  isLoading: PropTypes.bool
};

Layout.defaultProps = {
  isLoading: false
};

export default connect(mapStateToProps, null)(Layout);
