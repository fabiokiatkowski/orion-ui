import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import SingIn from './containers/SingIn';

const asyncTela200 = asyncComponent(() => {
  return import('./containers/painel200/PainelEstagiosAbertos');
});

const mainLayout = () => {
  return (
    <div>
      {/* <Layout>
        <Switch>
          <Route path="/tela200" component={asyncTela200} />
          <Redirect to="/" />
        </Switch>
      </Layout> */}
      <SingIn />
    </div>
  );
};

export default mainLayout;
