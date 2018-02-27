import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Lightbox from 'react-images';
import Immutable from 'immutable';
import axios from '../axios-orion';
import emptyImage from '../../assets/Empty-200x200.png';
import { listProductImages, listInsumoImages } from '../redux/modules/image';
import fixReferencia from '../utils/referencia';

const { baseURL } = axios.defaults;

const mapStateToProps = state => ({
  produtoImagens: state.image.produtos,
  insumoImagens: state.image.insumos
});

const mapDispatchToProps = dispatch => ({
  listProductImages: bindActionCreators(listProductImages, dispatch),
  listInsumoImages: bindActionCreators(listInsumoImages, dispatch)
});

class ImageContainer extends Component {
  static propTypes = {
    height: PropTypes.number,
    showHeader: PropTypes.bool,
    nivel: PropTypes.string,
    grupo: PropTypes.string,
    subGrupo: PropTypes.string,
    item: PropTypes.string,
    produtoImagens: PropTypes.instanceOf(Immutable.Map),
    insumoImagens: PropTypes.instanceOf(Immutable.Map),
    listProductImages: PropTypes.func.isRequired,
    listInsumoImages: PropTypes.func.isRequired
  }

  static defaultProps = {
    height: 200,
    showHeader: false,
    nivel: '',
    grupo: '',
    subGrupo: '',
    item: '',
    produtoImagens: new Immutable.Map(),
    insumoImagens: new Immutable.Map(),
  }

  state = {
    zoomOpened: false,
    currentImage: 0
  }

  componentDidMount() {
    this.loadImage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.nivel !== nextProps.nivel ||
        this.props.grupo !== nextProps.grupo ||
        this.props.subGrupo !== nextProps.subGrupo ||
        this.props.item !== nextProps.item
    ) {
      this.loadImage(nextProps);
      this.setState({ currentImage: 0 });
    }
  }

  getImageList = () => {
    if (this.props.nivel === '1') {
      return this.props.produtoImagens.get(fixReferencia(this.props.grupo));
    }
    const insumo = this.props.nivel + this.props.grupo +
      this.props.subGrupo + this.props.item;
    return this.props.insumoImagens.get(insumo);
  }

  getTumb = (image) => {
    const path = image.get('path');
    return `${baseURL}/api/images/download?imagePath=${path}&height=${this.props.height}`;
  }

  getTag = (imageList) => {
    return imageList.filter(i => i.get('type') === 'tag').get(0);
  }

  getFileName = (image) => {
    return image.get('name');
  }

  getPaths = (imageList) => {
    return imageList.map((i) => {
      return {
        src: `${baseURL}/api/images/download?imagePath=${i.get('path')}`,
        caption: i.get('name')
      };
    }).toJS();
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

  loadImage = (props) => {
    const {
      nivel,
      grupo,
      subGrupo,
      item,
      produtoImagens,
      insumoImagens
    } = props;

    const insumo = nivel + grupo + subGrupo + item;
    const fixedRef = fixReferencia(grupo);
    if (nivel === '1' && !produtoImagens.get(fixedRef)) {
      this.props.listProductImages(fixedRef);
    } else if (nivel !== '1' && !insumoImagens.get(insumo)) {
      this.props.listInsumoImages(insumo);
    }
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
    const { zoomOpened, currentImage } = this.state;
    const imageList = this.getImageList();
    let fileName = 'FileName.jpg';
    let tumb = emptyImage;
    let paths = [];

    if (imageList) {
      const tagImage = this.getTag(imageList);
      if (tagImage) {
        fileName = this.getFileName(tagImage);
        tumb = this.getTumb(tagImage);
        paths = this.getPaths(imageList);
      }
    }

    return (
      <div className="image-container">
        <div className="panel panel-default">
          {this.props.showHeader &&
            <div className="panel-heading">
              {fileName}
            </div>}
          <div className="panel-body">
            <img
              className="card-img-top"
              src={tumb}
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer);
