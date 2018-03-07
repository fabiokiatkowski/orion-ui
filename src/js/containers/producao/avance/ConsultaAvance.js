import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, ControlLabel } from 'react-bootstrap';
import GridAvance from './GridAvance';
import OrdemProducaoField from './OrdemProducaoField';
import ImageContainer from '../../../components/ImagesContainer';
import { listarAvanceEstagio, limparGridAvance } from '../../../redux/modules/producao/producao';

class ConsultaAvance extends Component {
  static propTypes = {
    ordemInfo: PropTypes.object,
    referenciaInfo: PropTypes.object,
    data: PropTypes.array,
    ordemProducao: PropTypes.number,
    listarAvanceEstagio: PropTypes.func.isRequired,
    limparGridAvanceEstagio: PropTypes.func.isRequired,
    location: PropTypes.object,
  };
  static defaultProps = {
    ordemInfo: null,
    referenciaInfo: null,
    data: [],
    ordemProducao: 0,
    location: null
  };
  state = {
    ordemProducaoText: '',
    minHeight: 600
  }
  componentDidMount() {
    const { search } = this.props.location;
    if (search) {
      const q = new URLSearchParams(search);
      const ordemProducao = q.get('ordemProducao');
      this.doFind(ordemProducao);
    }
    if (this.props.ordemProducao) {
      this.doFind(this.props.ordemProducao);
    }
    if (this.props.data &&
      (!this.state.ordemProducaoText || this.state.ordemProducaoText === 0)) {
      this.props.limparGridAvanceEstagio();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao &&
      nextProps.ordemProducao !== this.props.ordemProducao) {
      this.doFind(nextProps.ordemProducao);
    }
  }
  onClickHandler = () => {
    this.doFind(this.state.ordemProducaoText);
  }
  onChangeHandler = (ordemProducaoText) => {
    this.setState({ ordemProducaoText });
  }
  doFind = (ordemProducao) => {
    this.setState({ ordemProducaoText: ordemProducao }, () => {
      this.props.listarAvanceEstagio(ordemProducao);
    });
  };
  render() {
    const {
      ordemProducaoText,
      minHeight
    } = this.state;
    return (
      <div className="avance-main-grid">
        <div className="avance-filter">
          <ImageContainer
            height={100}
            nivel="1"
            grupo={this.props.referenciaInfo &&
              this.props.referenciaInfo.referencia}
          />
          <div className="search-op">
            <ControlLabel>Order Produção</ControlLabel>
            <Form inline>
              <OrdemProducaoField
                onChange={this.onChangeHandler}
                value={ordemProducaoText}
              />{' '}
              <Button onClick={this.onClickHandler}>Consultar</Button>
            </Form>
          </div>
          <div className="info">
            <span>
              <strong>Periodo:</strong>
              {this.props.ordemInfo &&
                this.props.ordemInfo.periodoProducao}
            </span>
            <span>
              <strong>Referência:</strong>
              {this.props.referenciaInfo &&
                this.props.referenciaInfo.referencia}-
              {this.props.referenciaInfo &&
                this.props.referenciaInfo.descrReferencia}
            </span>
          </div>
        </div>
        <div className="avance-result">
          <GridAvance
            minHeight={minHeight}
            data={this.props.data}
            handleRowChange={this.handleRowChange}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ordemInfo: state.producao.avance.ordemInfo,
  referenciaInfo: state.producao.avance.referenciaInfo,
  data: state.producao.avance.data
});
const mapDispatchToProps = dispatch => ({
  listarAvanceEstagio: bindActionCreators(listarAvanceEstagio, dispatch),
  limparGridAvanceEstagio: bindActionCreators(limparGridAvance, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsultaAvance);
