import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Types from '../../../utils/filterTypes';
import fixReferencia from '../../../utils/referencia';
import ObservacaoTypes from '../../../types/ObservacaoTypes';
import { add,
  list,
  clearList,
  getStObs,
  listPeD
} from '../../../redux/modules/observacao';
import Comments from '../../../components/Comments/Comments';

const columns = [
  {
    key: 'dataObservacao',
    name: 'Data',
    filterable: true,
    resizable: true,
    sortable: false,
    type: Types.DATE,
    order: 1,
  },
  {
    key: 'usuario',
    name: 'Usuario',
    filterable: true,
    resizable: true,
    sortable: false,
    type: Types.TEXT,
    order: 2,
  },
  {
    key: 'estagio',
    name: 'Estagio',
    filterable: true,
    resizable: true,
    sortable: false,
    type: Types.TEXT,
    order: 3,
  },
  {
    key: 'observacao',
    name: 'obs aux',
    hidden: true
  }
];

class Observacao200 extends Component {
  state = {
    observacao: ''
  }
  componentDidMount() {
    if (this.props.ordemProducao) {
      if (this.props.observacaoType === ObservacaoTypes.ORION) {
        this.props.getObservacaoOrion(this.props.ordemProducao, false);
      } else if (this.props.observacaoType === ObservacaoTypes.SYSTEXTIL) {
        this.props.getObservacaoSystextil(this.props.ordemProducao);
      }
    }
    if (this.props.referencia) {
      this.props.getObservacaoPeD(fixReferencia(this.props.referencia));
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ observacao: '' }, () => {
      if (nextProps.ordemProducao !== this.props.ordemProducao) {
        if (nextProps.ordemProducao) {
          if (this.props.observacaoType === ObservacaoTypes.ORION) {
            this.props.getObservacaoOrion(nextProps.ordemProducao, false);
          } else if (this.props.observacaoType === ObservacaoTypes.SYSTEXTIL) {
            this.props.getObservacaoSystextil(nextProps.ordemProducao);
          }
        } else {
          this.props.clearList();
        }
      }
      if (this.props.referencia &&
        nextProps.referencia !== this.props.referencia) {
        this.props.getObservacaoPeD(fixReferencia(nextProps.referencia));
      }
    });
  }
  onSave = (text) => {
    const observacao = text;
    const data = {
      descEstagio: this.props.descEstagio,
      observacao
    };
    this.props.add(this.props.ordemProducao, data);
  }
  handleRowChange = (data) => {
    const observacao = data.get('observacao');
    this.setState({ observacao });
  }
  render() {
    const { observacao } = this.state;
    let data = [];
    if (this.props.observacaoType === ObservacaoTypes.ORION) {
      data = this.props.orionData;
    } else if (this.props.observacaoType === ObservacaoTypes.SYSTEXTIL) {
      data = this.props.systextilData;
    } else if (this.props.observacaoType === ObservacaoTypes.PeD) {
      data = this.props.peDData;
    }
    return (
      <Comments
        canAdd={this.props.observacaoType === ObservacaoTypes.ORION}
        columns={columns}
        data={data}
        onSave={this.props.observacaoType === ObservacaoTypes.ORION
          ? this.onSave
          : null}
        onRowChange={this.handleRowChange}
        commentText={observacao || this.props.systextilData}
        observacaoType={this.props.observacaoType}
      />
    );
  }
}

Observacao200.propTypes = {
  ordemProducao: PropTypes.number,
  descEstagio: PropTypes.string,
  referencia: PropTypes.string,
  observacaoType: PropTypes.symbol.isRequired,
  orionData: PropTypes.array,
  systextilData: PropTypes.string,
  peDData: PropTypes.array,
  add: PropTypes.func.isRequired,
  getObservacaoOrion: PropTypes.func.isRequired,
  getObservacaoSystextil: PropTypes.func.isRequired,
  getObservacaoPeD: PropTypes.func.isRequired,
  clearList: PropTypes.func.isRequired
};

Observacao200.defaultProps = {
  ordemProducao: 0,
  descEstagio: '',
  referencia: '',
  orionData: [],
  systextilData: '',
  peDData: []
};
const mapStateToProps = state => ({
  orionData: state.observacao.obs,
  systextilData: state.observacao.systextil,
  peDData: state.observacao.ped
});
const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(add, dispatch),
  getObservacaoOrion: bindActionCreators(list, dispatch),
  getObservacaoSystextil: bindActionCreators(getStObs, dispatch),
  getObservacaoPeD: bindActionCreators(listPeD, dispatch),
  clearList: bindActionCreators(clearList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Observacao200);
