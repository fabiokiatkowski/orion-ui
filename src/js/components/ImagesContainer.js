import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import axios from '../axios-orion';

export default class ImageContainer extends Component {
  state = { zoomOpened: false }

  componentDidMount() {
    this.getTumb();
  }

  getTumb = () => {
    axios.get('/api/images/base64/download?imagePath=/home/prs/Pictures/Screenshot_20180102_105952.jpeg&height=200')
      .then((res) => {
        this.setState({ tumb: `data:image/jpeg;base64,${res.data}` });
      });
  };

  toggleZoom = () => {
    this.setState((prevState) => {
      return {
        zoomOpened: !prevState.zoomOpened
      };
    });
  }

  close = (e) => {
    e.stopPropagation();
    this.setState({ zoomOpened: false });
  }

  render() {
    const { zoomOpened, tumb } = this.state;
    const { path } = this.props;
    return (
      <div className="image-container">
        <div className="panel panel-default">
          <div className="panel-heading">
            FileName.jpg
          </div>
          <div className="panel-body">
            <img
              className="card-img-top"
              src={tumb}
              alt="teste"
            />
            <Lightbox
              images={[{ src: 'http://localhost:8080/api/images/download' }]}
              isOpen={zoomOpened}
              onClose={this.close}
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
