import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

class CancelarOp extends Component {
  state = {
    showBuscador: false
  }

  handleOpenModal = () => {
    this.setState({ showBuscador: true });
  };

  handleCloseModal = () => {
    this.setState({ showBuscador: false });
  };

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
            show={this.state.showBuscador}
            onHide={this.handleCloseModal}
          >
            <Modal.Header>
              <Modal.Title>
                Cancelar Ordem Produção {this.props.ordemProducao}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup>
                <InputGroup>
                  <FormControl type="text" />
                  <InputGroup.Button>
                    <Button bsStyle="primary">Cancelar</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default CancelarOp;
