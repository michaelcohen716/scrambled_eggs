import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Game from './components/Game';
import LevelsPage from './components/LevelsPage';
import RoundReview from './components/RoundReview';
import AdvanceStage from './components/AdvanceStage';
import MenuPage from './components/MenuPage';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" tabs={false}>
        <Scene key="login" component={LoginForm} title="Please Login" />
        <Scene key="levels" component={LevelsPage} title="Levels" />
        <Scene key="game" component={Game} title="Game On" />
        <Scene key="roundReview" component={RoundReview} title="Round Review" />
        <Scene key="advanceStage" component={AdvanceStage} title="Advance Stage" />
        <Scene initial key="menuPage" component={MenuPage} title="Menu" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
