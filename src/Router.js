import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Game from './components/Game';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene initial key="login" component={LoginForm} title="Please Login" />
        <Scene key="home" component={Home} title="Home Page" />
        <Scene key="game" component={Game} title="Game On" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
