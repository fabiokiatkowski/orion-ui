import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../../../components/Grid';
import { getOndeUsa } from '../../../redux/modules/visualizador';

const mapStateToProps = state => ({
  data: state.visualizador.ondeUsa
});

const mapDispathToProps = dispatch => ({
  getOndeUsa: bindActionCreators(getOndeUsa, dispatch)
});

class OndeUsaGrid extends Component {
  static propTypes = {
    data: PropTypes.string.isRequired,
    getOndeUsa: PropTypes.func.isRequired,
    nivel: PropTypes.string,
    grupo: PropTypes.string,
    sub: PropTypes.string,
    item: PropTypes.string
  }

  static defaultProps = {
    nivel: '0',
    grupo: '00000',
    sub: '000',
    item: '000000'
  }

  componentDidMount() {
    this.list();
  }

  list = () => {
    const {
      nivel,
      grupo,
      sub,
      item
    } = this.props;
    this.props.getOndeUsa(nivel, grupo, sub, item);
  };

  render() {
    return (
      <Grid
        minHeight={500}
        data={this.props.data}
        handleRowChange={() => {}}
        gridName="ondeUsaVisualizador"
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps,
  null,
  { withRef: true }
)(OndeUsaGrid);
