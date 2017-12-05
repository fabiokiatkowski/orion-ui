import React from 'react';
import PropTypes from 'prop-types';

const StageComponent = (props) => {
  const listStage = props.stages.map((stage) => {
    return <li key={stage.stageId.toString()} className="list-group-item">{stage.stageName}</li>;
  });
  return (
    <ul className="list-group">{listStage}</ul>
  );
};

StageComponent.propTypes = {
  stages: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default StageComponent;
