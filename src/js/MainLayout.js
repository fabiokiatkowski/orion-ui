import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import SignIn from './containers/SignIn';
import Layout from './hoc/Layout/Layout';
import PainelVisualizador from './containers/visualizador/PainelVisualizador';
import SUS from './containers/suprimentos/SUS/SUS';

const asyncTela200 = asyncComponent(() => {
  return import('./containers/painel200/PainelEstagiosAbertos');
});

const mainLayout = () => {
  return (
    <div>
      <Switch>
        <Route path="/signIn" component={SignIn} />
        <Layout>
          <Route path="/tela200" component={asyncTela200} />
          <Route path="/visualizador" component={PainelVisualizador} />
          <Route path="/sus" component={SUS} />          
        </Layout>
      </Switch>
    </div>
  );
};

export default mainLayout;
