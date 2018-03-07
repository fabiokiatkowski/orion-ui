import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class ColumnsConfigHeader extends Component {
  state = {
    currentProfile: null,
    profiles: []
  }

  componentDidMount() {
    this.test();
  }

  test = () => {
    this.setState({
      currentProfile: { id: 5, nome: 'Default' },
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

  renderProfileOptions = () => {
    return this.state.profiles.map((profile) => {
      return <option value={profile.id}>{profile.nome}</option>;
    });
  }

  render() {
    const { currentProfile } = this.state;
    return (
      <div className="config-header">
        <h4 className="modal-title">Configurações</h4>
        <select
          className="form-control profile-options"
          name="summary_index"
          value={currentProfile && currentProfile.id}
        >
          {this.renderProfileOptions()}
        </select>
      </div>
    );
  }
}

export default ColumnsConfigHeader;
