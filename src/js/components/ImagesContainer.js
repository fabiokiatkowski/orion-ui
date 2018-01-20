import React, {Component, PropTypes} from 'react';
import Lightbox from 'react-images';
import ax

export default class ImageContainer extends Component {
  state = { zoomOpened: false }

  toggleZoom = () => {
    this.setState((prevState) => {
      return {
        zoomOpened: !prevState.zoomOpened
      };
    });
  }

  getImages = () => {
    axios.get(getQueryString(url, periodo, representante, dataInicio, dataFim))
      .then(res => dispatch({
        type: LIST,
        data: res.data
      }));
  }

  close = (e) => {
    e.stopPropagation();
    this.setState({ zoomOpened: false });
  }

  render() {
    const { zoomOpened } = this.state;
    const { imageBase64 } = this.props;
    return (
      
    );
  }
}
