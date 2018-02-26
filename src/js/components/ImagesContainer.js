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

const mapStateToProps = state => ({
  produtoImagens: state.image.produtos
});

const mapDispatchToProps = dispatch => ({
  listProductImages: bindActionCreators(listProductImages, dispatch),
  listInsumoImages: bindActionCreators(listInsumoImages, dispatch)
});

class ImageContainer extends Component {
  static propTypes = {
    height: PropTypes.number,
    showHeader: PropTypes.bool,
    nivel: PropTypes.string.isRequired,
    grupo: PropTypes.string.isRequired,
    subGrupo: PropTypes.string,
    item: PropTypes.string,
    produtoImagens: PropTypes.array,
    insumoImagens: PropTypes.array,
    listProductImages: PropTypes.func.isRequired,
    listInsumoImages: PropTypes.func.isRequired
  }

  static defaultProps = {
    height: 200,
    showHeader: false,
    subGrupo: '',
    item: '',
    produtoImagens: new Immutable.Map(),
    insumoImagens: new Immutable.Map(),
  }

  state = {
    zoomOpened: false,
    paths: [],
    currentImage: 0
  }

  componentDidMount() {
    this.loadImage(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.nivel !== nextProps.nivel ||
        this.props.grupo !== nextProps.grupo ||
        this.props.subGrupo !== nextProps.subGrupo ||
        this.props.item !== nextProps.item
    ) {
      this.loadImage(nextProps);
    }
  }

  getImageList = (props) => {
    if (props.nivel === '1') {
      return props.produtoImagens.get(fixReferencia(props.grupo) ||
        new Immutable.Map());
    }
    const insumo = props.nivel + props.grupo + props.subGrupo + props.item;
    return props.insumoImagens.get(insumo) || new Immutable.Map();
  }

  getTumb = (props) => {
    const imageList = this.getImageList(props);
    const image = imageList.filter(i => i.get('type') === 'tag');
    axios.get(`/api/images/base64/download?imagePath=${image.get(0).get('path')}&height=${this.props.height}`)
      .then((res) => {
        this.setState({
          tumb: `data:image/jpeg;base64,${res.data}`,
          fileName: image.get(0).get('name')
        });
      });
  };

  getPaths = (props) => {
    const imageList = this.getImageList(props);
    const paths = imageList.map((i) => {
      return {
        src: `http://localhost:8080/api/images/download?imagePath=${i.get('path')}`,
        caption: i.get('name')
      };
    }).toJS();
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
      this.props.listProductImages(grupo);
    } else if (nivel !== '1' && !insumoImagens.get(insumo)) {
      this.props.listInsumoImages(insumo);
    }
    this.getTumb(props);
    this.getPaths(props);
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
          {this.props.showHeader &&
            <div className="panel-heading">
              {fileName || 'FileName.jpg'}
            </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer);
