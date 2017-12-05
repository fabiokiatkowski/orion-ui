import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StageComponent from '../components/StageComponent';
import SearchField from '../components/SearchField';
import UserInfo from '../components/UserInfo';
import { getSync } from '../redux/modules/userInfo';

const mapStateToProps = state => ({
  user: state.userInfo
});

const mapDispatchToProps = (dispatch) => {
  return { getSync: bindActionCreators(getSync, dispatch) };
};

class UserStages extends React.Component {
  constructor() {
    super();
    this.state = { virtualSearchString: '' };
  }
  componentDidMount() {
    const { searchString } = this.props.user;
    const { getSync } = this.props;
    if (searchString) {
      getAsync(searchString);
    }
  }

  handleChange(e) {
    this.props.getSync(e.target.value);
    this.setState({ virtualSearchString: e.target.value });
  }

  render() {
    const { virtualSearchString } = this.state;
    const { userInfo } = this.props.user;
    return (
      <div className="container">
        <SearchField
          onChange={e => this.handleChange(e)}
          searchString={virtualSearchString}
        />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              <UserInfo user={userInfo.user} />
            </h3>
          </div>
          <div className="panel-body">
            <StageComponent stages={userInfo.stages} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStages);
