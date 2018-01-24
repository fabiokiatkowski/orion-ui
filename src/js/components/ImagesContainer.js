import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import axios from '../axios-orion';
import emptyImage from '../../assets/Empty-200x200.png';

export default class ImageContainer extends Component {
  state = {
    zoomOpened: false,
    paths: [],
    currentImage: 0
  }

  /* Refactor this to make receive tumb and image paths */
  componentWillReceiveProps(nextProps) {
    if (nextProps.imageList && nextProps.imageList.size) {
      this.getTumb(nextProps);
      this.getPaths(nextProps);
    }
  }

  getTumb = (props) => {
    const image = props.imageList.filter(i => i.get('type') === 'tag');
    axios.get(`/api/images/base64/download?imagePath=${image.get(0).get('path')}&height=200`)
      .then((res) => {
        this.setState({
          tumb: `data:image/jpeg;base64,${res.data}`,
          fileName: image.get(0).get('name')
        });
      });
  };

  getPaths = (props) => {
    const paths = props.imageList.map((i) => {
      return {
        src: `http://localhost:8080/api/images/download?imagePath=${i.get('path')}`,
        caption: i.get('name')
      };
    }).toJS();
    console.log(paths);
    this.setState({ paths, currentImage: 0 });
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  gotoImage = (index) => {
    this.setState({
      currentImage: index,
    });
  }

  toggleZoom = () => {
    this.setState((prevState) => {
      return {
        zoomOpened: !prevState.zoomOpened
      };
    });
  }

  close = () => {
    this.setState({ zoomOpened: false });
  }

  render() {
    const {
      zoomOpened,
      tumb,
      fileName,
      paths,
      currentImage
    } = this.state;

    return (
      <div className="image-container">
        <div className="panel panel-default">
          <div className="panel-heading">
            {fileName || 'FileName.jpg'}
          </div>
          <div className="panel-body">
            <img
              className="card-img-top"
              src={tumb || emptyImage}
              alt="imagens"
            />
            <Lightbox
              images={paths}
              currentImage={currentImage}
              isOpen={zoomOpened}
              onClose={this.close}
              onClickNext={this.gotoNext}
              onClickPrev={this.gotoPrevious}
              onClickThumbnail={this.gotoImage}
              showThumbnails
            />
          </div>
          <div className="image-overlay">
            <a
              className=""
              onClick={this.toggleZoom}
            >
              <i className="fa fa-search fa-4x" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
