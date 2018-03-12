import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '../../../../components/Grid';
import { listarFilhos, limparFilhos } from '../../../../redux/modules/tela200';

const mapStateToProps = state => ({
  data: state.tela200.filhos.data
});

const mapDispatchToProps = dispatch => ({
  listarFilhos: bindActionCreators(listarFilhos, dispatch),
  limparFilhos: bindActionCreators(limparFilhos, dispatch)
});

class GridFilhos extends Component {
  componentDidMount() {
    this.props.listarFilhos(this.props.ordemPrincipal);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemPrincipal !== this.props.ordemPrincipal
      && nextProps.ordemPrincipal > 0) {
      this.props.listarFilhos(nextProps.ordemPrincipal);
    } else if (nextProps.ordemPrincipal === 0) {
      this.props.limparFilhos();
    }
  }

  render() {
    return (
      <Grid
        minHeight={this.props.minHeight}
        data={this.props.data}
        grinName="totaisOPFilhos"
        indexes={[]}
      />
    );
  }
}


GridFilhos.propTypes = {
  listarFilhos: PropTypes.func.isRequired,
  limparFilhos: PropTypes.func.isRequired,
  data: PropTypes.array,
  ordemPrincipal: PropTypes.number,
  minHeight: PropTypes.number.isRequired
};

GridFilhos.defaultProps = {
  data: [],
  ordemPrincipal: 0
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridFilhos);
