import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Modal, Button, FormGroup, FormControl, InputGroup, Alert, HelpBlock } from 'react-bootstrap';
import { cancelarOrdemProducao, limparCancelamento } from '../../../../redux/modules/tela200';

class CancelarOp extends Component {
  static propTypes = {
    ordemProducao: PropTypes.number.isRequired,
    ordemPrincipal: PropTypes.number.isRequired,
    cancelarOrdem: PropTypes.func.isRequired,
    limparCancelamento: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    hasErrors: PropTypes.bool.isRequired
  }
  state = {
    showModal: false,
    showAlert: false,
    observacaoText: ''
  }
  getValidationState() {
    const { observacaoText } = this.state;
    if (observacaoText.length > 0 &&
      observacaoText.length < 10) return 'error';
    return null;
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.props.limparCancelamento();
    this.setState({
      showModal: false,
      observacaoText: '',
      showAlert: false
    });
  };
  handleAlertDismiss = () => {
    this.setState({ showAlert: false });
  }
  handleObservacaoCancelamento = (event) => {
    this.setState({ observacaoText: event.target.value });
  }
  handleOnCancelarClick = () => {
    const op = this.props.ordemPrincipal === 0 ?
      this.props.ordemProducao
      :
      this.props.ordemPrincipal;

    this.props.cancelarOrdem(
      op,
      this.state.observacaoText
    );
    this.setState({ showAlert: true, observacaoText: '' });
  }
  render() {
    return (
      <div>
        <Button
          disabled={!this.props.ordemProducao}
          bsStyle="danger"
          className="btn-margin-top left"
          onClick={this.handleOpenModal}
        >
          Cancelar
        </Button>
        <div className="static-modal">
          <Modal
            show={this.state.showModal}
            onHide={this.handleCloseModal}
          >
            <Modal.Header>
              <Modal.Title>
                Cancelar Ordem Produção {this.props.ordemProducao}
              </Modal.Title>
              {
                this.state.showAlert &&
                <Alert
                  bsStyle={this.props.hasErrors ? 'danger' : 'success'}
                  onDismiss={this.handleAlertDismiss}
                >
                  <h4>Erro ao cancelar OP</h4>
                  {this.props.messages &&
                    this.props.messages.map(msg => <p>{msg}</p>)}
                </Alert>
              }
            </Modal.Header>

            <Modal.Body>
              <p>Insira o motivo do cancelamento da ordem de produção</p>
              <FormGroup
                validationState={this.getValidationState()}
              >
                <FormControl
                  value={this.observacaoText}
                  type="text"
                  maxLength="80"
                  onChange={this.handleObservacaoCancelamento}
                />
                <FormControl.Feedback />
                <HelpBlock>O motivo de cancelamento deve
                  conter no mínimo 10 caracteres
                </HelpBlock>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <InputGroup.Button>
                <Button
                  disabled={this.state.observacaoText.length < 10}
                  bsStyle="danger"
                  onClick={this.handleOnCancelarClick}
                >Confirmar Cancelamento
                </Button>
                <Button bsStyle="default" onClick={this.handleCloseModal}>Sair</Button>
              </InputGroup.Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasErrors: state.tela200.cancelar.hasErrors,
  messages: state.tela200.cancelar.messages
});
const mapDispatchToProps = dispatch => ({
  cancelarOrdem: bindActionCreators(cancelarOrdemProducao, dispatch),
  limparCancelamento: bindActionCreators(limparCancelamento, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CancelarOp);
