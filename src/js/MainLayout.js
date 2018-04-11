import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './containers/SignIn';
import Layout from './hoc/Layout/Layout';


const mainLayout = () => {
  return (
    <div>
      <Switch>
        <Route path="/signIn" component={SignIn} />
        <Layout>
          <Route path="/test" component={SignIn} />
        </Layout>
      </Switch>
    </div>
  );
};

export default mainLayout;
