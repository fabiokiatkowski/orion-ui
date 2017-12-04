import React from 'react';

export default function StageComponent(props) {
  const listStage = props.stages.map((stage) => {
       return <li key={stage.stageId.toString()} className="list-group-item">{stage.stageName}</li>
   });
   return (
       <ul className="list-group">{listStage}</ul>
   );
}