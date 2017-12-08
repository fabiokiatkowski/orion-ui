import React from 'react';

// const renderToolbar 

const ResizableGridWrapper = (props) => {
  const minHeight = Number.parseInt(props.style.height, 10) - 60;
  const { children } = props;
  const mutatedChildren = React.Children.map(children, child =>
    React.cloneElement(child, { minHeight: minHeight }));

  return (
    <div {...props}>
      { mutatedChildren }
    </div>
  );
};

export default ResizableGridWrapper;
