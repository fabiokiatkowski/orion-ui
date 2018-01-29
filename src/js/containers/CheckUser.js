import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as session from '../redux/modules/session';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

class CheckUser extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentUser: PropTypes.object
  };

  componentDidMount() {
    this.checkUser();
  }

  componentDidUpdate() {
    this.checkUser();
  }

  checkUser = () => {
    const { dispatch, currentUser } = this.props;
    if (localStorage.getItem('orion.authToken')) {
      if (!currentUser) {
        dispatch(session.currentUser());
      }
    } else {
      dispatch(push('/signIn'));
    }
  }

  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return null;
    }
    return this.props.children;
  }
}

export default connect(mapStateToProps, null)(CheckUser);
