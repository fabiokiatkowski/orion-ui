import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash/fp/debounce';
import axios from '../axios-orion';
import { loginSucess, getApelido } from '../redux/modules/session';
import getIp from '../utils/ip';

const URL = `${axios.defaults.baseURL}/login`;

const mapStateToProps = state => ({
  apelido: state.session.selectApelido
});

const mapDispatchToProps = dispatch => ({
  loginSucess: bindActionCreators(loginSucess, dispatch),
  getApelido: bindActionCreators(getApelido, dispatch)
});

class SingIn extends Component {
  constructor(props) {
    super(props);
    this.debouncedOnIdChange = debounce(100, this.onIdChange);
  }

  componentDidMount() {
    if (this.crachaInput.value) {
      this.props.getApelido(this.crachaInput.value);
    }
  }

  onIdChange = () => {
    if (this.crachaInput.value) {
      this.props.getApelido(this.crachaInput.value);
    }
  }

  /* I'll refactor this... */
  login = (e) => {
    e.preventDefault();
    const id = e.target.idCracha.value;
    const password = e.target.password.value;
    getIp.then((ip) => {
      fetch(URL, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ username: id, password, ip }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          const tokenId = 'orion.authToken';
          const token = res.headers.get('authorization');
          localStorage.setItem(tokenId, token);
          this.props.loginSucess();
        }
      });
    });
  }

  render() {
    return (
      <div className="sing-in-container">
        <div className="row main">
          <div className="panel-heading">
            <div className="panel-title text-center">
              <h1 className="title">Pacifico Sul</h1>
              <hr />
            </div>
          </div>
          <div className="main-login main-center">
            <form className="form-horizontal" onSubmit={e => this.login(e)}>
              <div className="form-group">
                <label htmlFor="id-cracha" className="cols-sm-2 control-label">
                  Cracha
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-id-card fa" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="idCracha"
                      id="id-cracha"
                      placeholder="Cracha"
                      ref={(input) => { this.crachaInput = input; }}
                      onChange={this.debouncedOnIdChange}
                    />
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      id="id-user-name"
                      placeholder="Nome"
                      value={this.props.apelido}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock fa-lg" aria-hidden="true" />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="Senha"
                      onChange={this.onPasswordChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group ">
                <button type="submit" className="btn btn-lg btn-block login-button">
                  Entrar
                </button>
              </div>
              <div className="login-register">
                <a href="#">Solicitar nova senha</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingIn);
