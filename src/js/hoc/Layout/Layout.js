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
