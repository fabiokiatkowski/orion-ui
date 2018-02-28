import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Types from '../../../utils/filterTypes';
import ObservacaoTypes from '../../../types/ObservacaoTypes';
import { add, list, clearList } from '../../../redux/modules/observacao';
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
  }
];

class Observacao extends Component {
  state = {
    observacao: ''
  }
  componentDidMount() {
    if (this.props.ordemProducao) {
      this.props.list(this.props.ordemProducao, false);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao) {
      this.setState({ observacao: '' });
      if (nextProps.ordemProducao) {
        this.props.list(nextProps.ordemProducao, false);
      } else {
        this.props.clearList();
      }
    }
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
    return (
      <Comments
        canAdd
        columns={columns}
        data={this.props.observacaoData}
        onSave={this.onSave}
        onRowChange={this.handleRowChange}
        commentText={observacao}
        observacaoType={ObservacaoTypes.ORION}
      />
    );
  }
}

Observacao.propTypes = {
  ordemProducao: PropTypes.number,
  descEstagio: PropTypes.string,
  observacaoData: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  list: PropTypes.func.isRequired,
  clearList: PropTypes.func.isRequired
};

Observacao.defaultProps = {
  ordemProducao: 0,
  descEstagio: ''
};
const mapStateToProps = state => ({
  observacaoData: state.observacao.obs,
});
const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(add, dispatch),
  list: bindActionCreators(list, dispatch),
  clearList: bindActionCreators(clearList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Observacao);
