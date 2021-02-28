import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import { GuardFunction, GuardToRoute, GuardFunctionRouteProps, Next } from 'react-router-guards/dist/types';
import { UserData } from './helpers';
import { Home, Login, Register, NotFound } from './containers/pages';
import 'bootstrap/dist/css/bootstrap.min.css';

const requiredLogin: GuardFunction = (to: GuardToRoute, from: GuardFunctionRouteProps | null, next: Next) => {
  if (to.meta.auth) {
    if (UserData.getToken()) {
      next();
    }
    next.redirect('/login');
  } else {
    next();
  }
};

function App() {
  return (
    <Router forceRefresh>
      <GuardProvider guards={[requiredLogin]}>
        <Switch>
          <GuardedRoute exact path="/" component={Home} meta={{ auth: true }} />
          <GuardedRoute exact path="/login" component={Login} />
          <GuardedRoute exact path="/register" component={Register} />
          <GuardedRoute component={NotFound} />
        </Switch>
      </GuardProvider>
    </Router>
  );
}

export default App;
