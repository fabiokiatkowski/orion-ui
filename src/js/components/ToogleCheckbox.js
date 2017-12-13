import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PADDING = {
  RIGHT: 'padding-right',
  LEFT: 'padding-left',
  TOP: 'padding-top',
  BOTTOM: 'padding-bottom'
};

const MARGIN = {
  RIGHT: 'margin-right',
  LEFT: 'margin-left',
  TOP: 'margin-top',
  BOTTOM: 'margin-bottom',
};

const getStyle = (el, str) => {
  parseInt(getComputedStyle(el).getPropertyValue(str), 10);
};

const getTextNodeBoundingClientRect = (node) => {
  const newNode = node.length ? node[node.length - 1] : node;
  if (typeof document.createRange === 'function') {
    const range = document.createRange();
    if (range.getBoundingClientRect) {
      range.selectNodeContents(newNode);
      return range.getBoundingClientRect();
    }
  }
  return 0;
};

const compareWithMarginOfError = (num1, num2, isSet) =>
  (isSet || Math.abs(num1 - num2) < 1.01);

const getDimension = (node) => {
  const margin = {};
  const padding = {
    right: getStyle(node, PADDING.RIGHT),
    left: getStyle(node, PADDING.LEFT),
    top: getStyle(node, PADDING.TOP),
    bottom: getStyle(node, PADDING.BOTTOM),
  };

  if (node.childElementCount) {
    const child = node.childNodes[0];
    margin.height =
      getStyle(child, MARGIN.BOTTOM) + getStyle(child, MARGIN.TOP);
    margin.width = getStyle(child, MARGIN.LEFT) + getStyle(child, MARGIN.RIGHT);

    return {
      width: (child.scrollWidth || child.offsetWidth) +
      margin.width + padding.left + padding.right,
      height: (child.scrollHeight || child.offsetHeight) +
      margin.height + padding.top + padding.bottom,
    };
  }

  const range = getTextNodeBoundingClientRect(node.childNodes);

  return {
    width: range.width + padding.right + padding.left,
    height: range.height + padding.bottom + padding.top,
  };
};

export default class ToogleCheckbox extends Component {
  constructor() {
    super();
    this.state = { width: null, height: null }
  }

  componentDidMount() {
    if (this.props.width && this.props.height) {
      return;
    }
    this.setDimensions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.width && this.props.height) {
      return;
    }
    this.setDimensions();
  }

  onClick = (evt) => {
    if (this.props.disabled) return;
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(!this.props.active, this.parent, evt);
    }
  }

  setDimensions = () => {
    const onDim = getDimension(this.on);
    const offDim = getDimension(this.off);

    const width = Math.max(onDim.width, offDim.width);
    const height = Math.max(onDim.height, offDim.height);

    const areAlmostTheSame = (
      compareWithMarginOfError(this.state.width, width, this.props.width) &&
        compareWithMarginOfError(this.state.height, height, this.props.height)
    );

    if (areAlmostTheSame) {
      return;
    }

    this.setState({
      width: this.props.width || width,
      height: this.props.height || height,
    });
  }

  getSizeClass = () => {
    if (this.props.size === 'lg') return 'btn-lg';
    if (this.props.size === 'sm') return 'btn-sm';
    if (this.props.size === 'xs') return 'btn-xs';
    return 'btn-md';
  }

  render() {
    const {
      active,
      onClick,
      onstyle,
      onClassName,
      offstyle,
      offClassName,
      handlestyle,
      handleClassName,
      style,
      on,
      off,
      className,
      disabled,
      width,
      height,
      ...props
    } = this.props;

    const sizeClass = this.getSizeClass();

    const s = {
      width: this.state.width || width,
      height: this.state.height || height,
    };

    return (
      // eslint-disable-next-line
      <div
        role="button"
        disabled={disabled}
        className={classnames('btn', 'toggle', className, sizeClass, {
          [`off btn-${offstyle}`]: !this.props.active,
          [`btn-${onstyle}`]: this.props.active,
        })}
        onClick={this.onClick}
        style={Object.assign({}, s, style)}
        {...props}
        ref={(c) => { this.parent = c; }}
      >
        <div className="toggle-group" >
          <span
            ref={(onLabel) => { this.on = onLabel; }}
            className={classnames(
              'btn toggle-on',
              sizeClass,
              onClassName, {
                [`btn-${onstyle}`]: onstyle,
              }
            )}
            disabled={disabled}
          >
            {on}
          </span>
          <span
            ref={(offLabel) => { this.off = offLabel; }}
            className={classnames(
              'btn toggle-off',
              sizeClass,
              offClassName, {
                [`btn-${offstyle}`]: offstyle,
              }
            )}
            disabled={disabled}
          >
            {off}
          </span>
          <span
            disabled={disabled}
            className={classnames(
              'toggle-handle btn',
              sizeClass,
              handleClassName, {
                [`btn-${handlestyle}`]: handlestyle,
              }
            )}
          />
        </div>
      </div>
    );
  }
}
