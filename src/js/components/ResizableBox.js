import React from 'react';

const ResizableBox = (props) => {
  let { width, height } = props.style;
  width = Number.parseInt(width, 10);
  height = Number.parseInt(height, 10);
  const { children, key } = props;
  const mutatedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {  minHeight: height }));

  return (
    <div {...props}>
      { mutatedChildren }
    </div>
  );
};

export default ResizableBox;


// var Wrapper = React.createClass({
//   render: function () {
//     var child = React.Children.only(this.props.children);
//     return (
//       <div {...this.props}>
//         {React.addons.cloneWithProps(child, {
//           width: this.props.style.width, 
//           height: this.props.style.height
//         })}
//       </div>
//     );
//   }
// });