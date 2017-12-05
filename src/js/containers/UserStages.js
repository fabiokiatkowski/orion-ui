import React from 'react';
import _ from 'lodash';
import GetAsync from '../requests';
import StageComponent from '../components/StageComponent';
import SearchField from '../components/SearchField';
import UserInfo from '../components/UserInfo';

export default class UserStages extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        user: {
          id: 0,
          name: '',
          nickname: ''
        },
        stages: [{
          stageId: 0,
          stageName: '',
          stageLeadTime: 0.0,
        },
        ]
      },
      searchString: ''
    };
  }

  componentDidMount() {
    if (this.state.searchString) {
      GetAsync(this.state.searchString).then(data => this.setState(data));
    }
  }

  handleChange(e) {
    this.setState({ searchString: e.target.value }, () => {
      _.debounce(
        () => GetAsync(this.state.searchString)
          .then(data => this.setState(data)),
        8
      );
    });
  }

  render() {
    return (
      <div className="container">
        <SearchField
          onChange={e => this.handleChange(e)}
          searchString={this.state.searchString}
        />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              <UserInfo user={this.state.userInfo.user} />
            </h3>
          </div>
          <div className="panel-body">
            <StageComponent stages={this.state.userInfo.stages} />
          </div>
        </div>
      </div>
    );
  }
}
