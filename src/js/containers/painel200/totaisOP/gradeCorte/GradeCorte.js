import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PivotTable from 'react-pivottable/PivotTable';
import { sortAs } from 'react-pivottable/Utilities';

class GradeCorte extends Component {
  state = {
    data: [],
    rows: ['cor'],
    cols: ['tamanho'],
    aggregatorName: 'Sum',
    vals: ['quantidade'],
    rendererName: 'Table',
    sorters: {
      OrdenacaoTamanho: sortAs([])
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.gridCorteData !== this.props.gridCorteData) {
      this.setState({ data: nextProps.gridCorteData });
    }
  }

  render() {
    return (
      <div>
        <PivotTable {...this.state} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gridCorteData: state.tela200.gradeCorte.data
});

GradeCorte.propTypes = {
  gridCorteData: PropTypes.array,
  listarInfos: PropTypes.func.isRequired,
  ordemProducao: PropTypes.number.isRequired
};

GradeCorte.defaultProps = {
  gridCorteData: []
};

export default connect(mapStateToProps, null)(GradeCorte);
