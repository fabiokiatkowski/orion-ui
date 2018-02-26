import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Col,
  Button
} from 'react-bootstrap';
import ImageContainer from '../../../components/ImagesContainer';
import Observacao from '../../../components/Observacao';
import Sizeme from '../../../components/Sizeme';
import GridSUS from './GridSUS';


class SUS extends Component {
  static propTypes = {
    referencia: PropTypes.string.isRequired
  }
  state = {
    nivel: '',
    grupo: '',
    subgrupo: '',
    item: '',
    fornecedor: '',
    ordemProducao: '',
    solicAlmoxSelected: false,
    verifComprasSelected: false,
    atendAlmoxSelected: false,
    solicCancelSelected: false,
    minHeight: 400,
    currentRow: []
  }
  handleCheckboxSelect = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  }
  changeGridSUSSize = (width, height) => {
    this.setState({ minHeight: height });
  }
  handleRowChange = (data) => {
    this.setState({ currentRow: data });
  }
  handleChangeForm = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const {
      solicAlmoxSelected,
      verifComprasSelected,
      atendAlmoxSelected,
      solicCancelSelected,
      minHeight,
      currentRow,
      nivel,
      grupo,
      subgrupo,
      item,
      fornecedor,
      ordemProducao
    } = this.state;
    return (
      <div className="SUS">
        <div className="filter">
          <ImageContainer referencia={currentRow.referencia} />
          <div className="filter-form">
            <Form>
              <div className="form-inline">
                <Col componentClass={ControlLabel} sm={10}>
                  Produto
                </Col>
                <Col sm={10}>
                  <FormControl name="nivel" id="nivel" maxLength="1" type="text" placeholder="Nivel" onChange={this.handleChangeForm} value={nivel} />{' '}
                  <FormControl name="grupo" id="grupo" maxLength="5" type="text" placeholder="grupo" onChange={this.handleChangeForm} value={grupo} />{' '}
                  <FormControl name="subgrupo" id="subgrupo" maxLength="3" type="text" placeholder="sub" onChange={this.handleChangeForm} value={subgrupo} />{' '}
                  <FormControl name="item" id="item" maxLength="6" type="text" placeholder="item" onChange={this.handleChangeForm} value={item} />
                </Col>
              </div>
              <div className="form">
                <Col componentClass={ControlLabel} className="labelMargin" sm={10}>
                  Fornecedor
                </Col>
                <Col sm={10}>
                  <FormControl name="fornecedor" id="fornecedor" type="text" placeholder="Nome do fornecedor" onChange={this.handleChangeForm} value={fornecedor} />
                </Col>
              </div>
              <div className="form">
                <Col componentClass={ControlLabel} className="labelMargin" sm={10}>
                  Ordem Produção
                </Col>
                <Col sm={4}>
                  <FormControl name="ordemProducao" id="ordemProducao" maxLength="9" type="text" placeholder="Ordem Produção" onChange={this.handleChangeForm} value={ordemProducao} />
                </Col>
              </div>
            </Form>
          </div>
          <div className="filter-situacoes-container">
            <ControlLabel>Situação da Requisição</ControlLabel>
            <div className="filter-situacaoes">
              <FormGroup>
                <Checkbox
                  name="solicAlmoxSelected"
                  checked={solicAlmoxSelected}
                  onChange={this.handleCheckboxSelect}
                >Solicitado pelo Almoxarifado
                </Checkbox>
                <Checkbox
                  name="verifComprasSelected"
                  checked={verifComprasSelected}
                  onChange={this.handleCheckboxSelect}
                >Verificado pelo Compras
                </Checkbox>
                <Checkbox
                  name="atendAlmoxSelected"
                  checked={atendAlmoxSelected}
                  onChange={this.handleCheckboxSelect}
                >Atendido no Almoxarifado
                </Checkbox>
                <Checkbox
                  name="solicCancelSelected"
                  checked={solicCancelSelected}
                  onChange={this.handleCheckboxSelect}
                >Solicitadcao Cancelada
                </Checkbox>
              </FormGroup>
            </div>
          </div>
          <div className="align-button">
            <Button>Consultar</Button>
          </div>
        </div>
        <div>
          <Sizeme handleChangeSize={this.changeGridSUSSize}>
            <GridSUS
              minHeight={minHeight}
              data={[]}
              handleRowChange={this.handleRowChange}
            />
          </Sizeme>
          <Observacao
            referencia={this.props.referencia}
            canAdd
          />
        </div>
      </div>
    );
  }
}

export default connect(null, null)(SUS);
