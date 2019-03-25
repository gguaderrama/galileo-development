// Dependencies
//import Bluebird from 'bluebird';
import "@babel/polyfill";
import React from 'react';
import { render } from 'react-dom';

//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Without Hash
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // With Hash

import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'constants/styles';

// Redux store
import store from './redux';

import * as serviceWorker from 'serviceWorker';

// Assets
import 'index.css';

// Grls
import App from 'App';
//import Page403 from 'App/scenes/Page403Forbidden';
import Page404 from 'App/scenes/Page404NotFound';

// Routes
import indexRoutes from 'routes';

render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <App>
          <Switch>
            {
              indexRoutes.map((prop, key) => {
                if(prop.render)
                  return <Route exact path={prop.path} render={prop.render} key={key} />
                return <Route exact path={prop.path} component={prop.component} key={key} />
              })
            }
            <Route component={Page404} />
          </Switch>
        </App>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'));
serviceWorker.unregister();
