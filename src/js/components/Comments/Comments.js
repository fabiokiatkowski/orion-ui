import React from 'react';
import PropTypes from 'prop-types';
import ObservacaoTypes from '../../types/ObservacaoTypes';
import CommentAdd from './CommentAdd';
import CommentList from './CommentList';
import CommentSystextil from './CommentSystextil';

const comments = (props) => {
  let commentsAddRender = null;
  let commentsListRender = null;
  if (props.observacaoType === ObservacaoTypes.ORION ||
    props.observacaoType === ObservacaoTypes.PeD) {
    commentsAddRender = props.canAdd
      ? <CommentAdd onSave={props.onSave} />
      : null;
    commentsListRender = (<CommentList
      onRowChange={props.onRowChange}
      commentText={props.commentText}
      columns={props.columns}
      data={props.data}
    />);
  } else {
    commentsListRender = <CommentSystextil />;
  }
  return (
    <div className="observacao-wrapper">
      {commentsAddRender}
      {commentsListRender}
    </div>
  );
};

comments.propTypes = {
  columns: PropTypes.array.isRequired,
  observacaoType: PropTypes.symbol.isRequired,
  data: PropTypes.array.isRequired,
  onSave: PropTypes.func,
  onRowChange: PropTypes.func,
  canAdd: PropTypes.bool,
  commentText: PropTypes.string
};

comments.defaultProps = {
  canAdd: false,
  commentText: '',
  onSave: () => {},
  onRowChange: () => {}
};

export default comments;
