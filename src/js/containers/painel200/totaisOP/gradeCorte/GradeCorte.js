import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import PivotTable from 'react-pivottable/PivotTable';
import { sortAs } from 'react-pivottable/Utilities';
import { listarGradeCorte } from '../../../../redux/modules/tela200';

class GradeCorte extends Component {
  componentDidMount() {
    this.props.listarInfoGridCorte(this.props.ordemProducao);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao) {
      this.props.listarInfoGridCorte(nextProps.ordemProducao);
    }
  }
  render() {
    return (
      <PivotTable
        data={this.props.gridCorteData}
        rows={['cor']}
        cols={['tamanho']}
        aggregatorName="Sum"
        vals={['quantidade']}
        rendererName="Table"
        sorters={{ OrdenacaoTamanho: sortAs([]) }}
      />
    );
  }
}

const mapStateToProps = state => ({
  gridCorteData: state.tela200.gradeCorte.data
});

const mapDispatchToProps = dispatch => ({
  listarInfoGridCorte: bindActionCreators(listarGradeCorte, dispatch)
});

GradeCorte.propTypes = {
  gridCorteData: PropTypes.array,
  listarInfoGridCorte: PropTypes.func.isRequired,
  ordemProducao: PropTypes.number.isRequired
};

GradeCorte.defaultProps = {
  gridCorteData: []
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeCorte);
