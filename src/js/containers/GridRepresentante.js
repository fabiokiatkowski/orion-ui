import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Filters } from 'react-data-grid-addons';
import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { list } from '../redux/modules/representante';

const columns = [{
  key: 'apelido',
  name: 'Nome',
  filterable: true,
  resizable: true,
  hidden: false,
  filterRenderer: Filters.MultiSelectFilter,
  sortable: true
}, {
  key: 'numeroPedido',
  name: 'Numero Pedido',
  filterRenderer: Filters.NumericFilter,
  filterable: true,
  resizable: true,
  hidden: false,
}, {
  key: 'empresa',
  name: 'Nome',
  filterable: true,
  resizable: true,
  hidden: false
}, {
  key: 'regiao',
  name: 'Nome',
  filterable: true,
  resizable: true,
  hidden: false
}, {
  key: 'totalPedido',
  name: 'Nome',
  filterable: true,
  resizable: true,
  hidden: false
}];

const mapStateToProps = state => ({
  data: state.representante.data
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(list, dispatch)
});

class GridRepresentante extends Component {
  componentDidMount() {
    this.props.list();
  }

  render() {
    return (
      <Grid
        height={this.props.height}
        width={this.props.width}
        data={this.props.data}
        columns={columns}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridRepresentante);
