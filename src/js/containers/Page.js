import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import LeftNav from '../components/SideBarNav';

export default class Page extends Component {
  componentDidMount() {
    /* Create redux to set title */
    // this.props.dispatch(app.setTitle(this.props.title));
  }

  componentDidUpdate(oldProps) {
    /* Create redux to update title */
    // if (oldProps.title !== this.props.title) {
    //   this.props.dispatch(app.setTitle(this.props.title));
    // }
  }

  toggleMenu = () => {
    /* Create redux to toggle left nav */
    // this.props.dispatch(application.toggleLeftNav());
  }

  splitChildrens = () => {
    const { children } = this.props;
    return React.Children.toArray(children).reduce((acc, child) => {
      if (child.type === 'HeaderItem') {
        return { ...acc, header: [...acc.header, child] };
      }
      return { ...acc, page: [...acc.page, child] };
    }, { header: [], page: [] });
  }

  render() {
    const { leftNavOpen, title } = this.props;
    const { header, page } = this.splitChildrens();
    return (
      <div id="app-container" className={!leftNavOpen ? 'is-full-page' : ''}>
        <Header id="header" title={title} onMenuClicked={this.toggleMenu()}>
          {header}
        </Header>
        <LeftNav />
        <section id="page-container">
          <div id={this.props.id} title={null} className={`page ${this.props.className}`}>
            {page}
          </div>
        </section>
        <footer id="footer" >
          <b>Copyright © 2018 <a href="http://www.pacificosul.com.br/novo/">Pacifico Sul</a></b>.
          <span className="is-hidden-mobile">Todos os direitos reservados.</span>
        </footer>
      </div>
    );
  }
}

const PageContent = (props) => {
  return (
    <nav className="nav page-menu">
      {props.children}
    </nav>
  );
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired
};

const PageMenu = (props) => {
  return (
    <nav className="nav page-menu">
      {props.children}
    </nav>
  );
};

PageMenu.propTypes = {
  children: PropTypes.node.isRequired
};

export { PageContent, PageMenu };
