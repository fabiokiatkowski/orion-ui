import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import PanelRepresentantes from './containers/PanelRepresentantes';

const asyncTela200 = asyncComponent(() => {
  return import('./containers/painel200/PainelEstagiosAbertos');
});

const mainLayout = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/tela200" component={asyncTela200} />
          <Route path="/" exact component={PanelRepresentantes} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
};

export default mainLayout;
