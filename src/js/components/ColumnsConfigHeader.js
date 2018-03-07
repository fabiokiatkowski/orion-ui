import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColumnsConfigHeader extends Component {
  static propTypes = {
    profiles: PropTypes.array.isRequired,
    currentProfile: PropTypes.number,
    onProfileChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    currentProfile: -1
  }

  handleChangeProfile = (e) => {
    this.props.onProfileChange(e.target.value);
  }

  renderProfileOptions = () => {
    return this.props.profiles.map((profile) => {
      return (
        <option
          key={`profile-${profile.id}`}
          value={profile.id}
        >
          {profile.nome}
        </option>
      );
    });
  }

  render() {
    const { currentProfile } = this.props;
    return (
      <div className="config-header">
        <h4 className="modal-title">Configurações</h4>
        <select
          className="form-control profile-options"
          name="summary_index"
          value={currentProfile}
          onChange={this.handleChangeProfile}
        >
          {this.renderProfileOptions()}
        </select>
      </div>
    );
  }
}

export default ColumnsConfigHeader;
