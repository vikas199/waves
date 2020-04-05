import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Home from './components/Home';
import RegisterLogin from './components/Register'
import Register from './components/Register/register'
import UserDashBoard from "./components/User";
import Auth from './hoc/auth'


const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashBoard, true)}/>>
      <Route path="/register" exact component={Auth(Register, false)}/>
      <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
        <Route path="/" exact component={Auth(Home,null)}/>
      </Switch>
    </Layout>

  )
}


export default Routes;
