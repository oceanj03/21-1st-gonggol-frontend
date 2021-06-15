import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from './Pages/Main/Main';
import Join from './Pages/Join/Join';
import Login from './Pages/Login/Login';
import Category from './Pages/Category/Category';
import Product from './Pages/Product/Product';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/category/:main" component={Category} />
          <Route exact path="/product/:id" component={Product} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
