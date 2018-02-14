import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkbox, FormGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import columns from './columns';
import Grid from '../../../../components/Grid';
import { listarOndeTem } from '../../../../redux/modules/tela200';

const mapStateToProps = state => ({
  data: state.tela200.ondeTem.data
});

const mapDispatchToProps = dispatch => ({
  listOndeTem: bindActionCreators(listarOndeTem, dispatch)
});

class GridOndeTem extends Component {
  state = {
    isSameOPChecked: true,
    isCheckboxCorChecked: true
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao
      || nextProps.grupo !== this.props.grupo
      || nextProps.item !== this.props.item) {
      this.props.listOndeTem(
        nextProps.ordemProducao,
        nextProps.grupo,
        nextProps.item,
        this.state.isSameOPChecked,
        this.state.isCheckboxCorChecked
      );
    }
  }
  checkboxOPHandler = () => {
    // this.setState({ isSameOPChecked: !this.state.isSameOPChecked });
    this.setState(
      { isSameOPChecked: !this.state.isSameOPChecked },
      () => {
        this.props.listOndeTem(
          this.props.ordemProducao,
          this.props.grupo,
          this.props.item,
          this.state.isSameOPChecked,
          this.state.isCheckboxCorChecked
        );
      }
    );
  };
  checkboxCorHandler = () => {
    this.setState(
      { isCheckboxCorChecked: !this.state.isCheckboxCorChecked },
      () => {
        this.props.listOndeTem(
          this.props.ordemProducao,
          this.props.grupo,
          this.props.item,
          this.state.isSameOPChecked,
          this.state.isCheckboxCorChecked
        );
      }
    );
  };
  render() {
    return (
      <div>
        <FormGroup>
          <Checkbox
            inline
            value={this.state.isSameOPChecked}
            checked={this.state.isSameOPChecked}
            onChange={this.checkboxOPHandler}
          >
            Não considerar OP selecionada
          </Checkbox>
          <Checkbox
            inline
            checked={this.state.isCheckboxCorChecked}
            onChange={this.checkboxCorHandler}
          >
            Considerar somente mesma cor
          </Checkbox>
        </FormGroup>
        <Grid
          minHeight={300}
          data={this.props.data}
          columns={columns}
          indexes={[]}
        />
      </div>
    );
  }
}

GridOndeTem.propTypes = {
  listOndeTem: PropTypes.func.isRequired,
  data: PropTypes.array,
  ordemProducao: PropTypes.number,
  grupo: PropTypes.string,
  item: PropTypes.string
};

GridOndeTem.defaultProps = {
  data: [],
  ordemProducao: 0,
  grupo: '',
  item: ''
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridOndeTem);
