import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

class CommentAdd extends Component {
  state = {
    commentText: ''
  };
  handleOnChangeText = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleOnClickSave = () => {
    this.props.onSave(this.state.commentText);
    this.setState({ commentText: '' });
  }
  render() {
    const { commentText } = this.state;
    return (
      <Form inline>
        <FormGroup bsClass="form-group observacao">
          <FormControl
            placeholder="Adicione uma observação..."
            componentClass="textarea"
            rows="2"
            id="observacao"
            name="commentText"
            value={commentText}
            onChange={this.handleOnChangeText}
          />
        </FormGroup>
        <FormGroup bsClass="form-group save-button">
          <Button
            type="button"
            btStyle="primary"
            onClick={this.handleOnClickSave}
          >Salvar
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

CommentAdd.propTypes = {
  onSave: PropTypes.func
};
CommentAdd.defaultProps = {
  onSave: () => {}
};

export default CommentAdd;
