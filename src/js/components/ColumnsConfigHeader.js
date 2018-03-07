import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColumnsConfigHeader extends Component {
  static propTypes = {
    currentProfile: PropTypes.number,
    onProfileChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    currentProfile: -1
  }

  state = {
    profiles: []
  }

  componentDidMount() {
    this.test();
  }

  test = () => {
    this.setState({
      profiles: [
        { id: 1, nome: 'teste' },
        { id: 2, nome: 'teste 2' },
        { id: 3, nome: 'teste 3' },
        { id: 4, nome: 'teste 4' },
        { id: 5, nome: 'Default' },
        { id: 6, nome: 'teste 6' },
        { id: 7, nome: 'teste 7' },
        { id: 8, nome: 'teste 8' }
      ]
    });
  }

  handleChangeProfile = (e) => {
    this.props.onProfileChange(e.target.value);
  }

  renderProfileOptions = () => {
    return this.state.profiles.map((profile) => {
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
