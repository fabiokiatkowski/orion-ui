import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

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

  render() {
    const { children } = this.props;
    return (
      <div id="app-container">
        <Header />
        <section id="page-container">
          {children}
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
