import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, Button, CssBaseline, Box } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

interface Props {
  history: History;
}

function App({ history }: Props) {
  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Box component="span" style={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={() => history.push('/')}>
              Hello
            </Button>
          </Box>

          <Button color="inherit" onClick={() => history.push('/signup')}>
            Sign up
          </Button>
          <Button color="inherit" onClick={() => history.push('/login')}>
            Log in
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </React.Fragment>
  );
}

export default withRouter(App);
