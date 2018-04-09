import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import LoginForm from './components/LoginForm';
import Game from './components/Game';
import LevelsPage from './components/LevelsPage';
import RoundReview from './components/RoundReview';
import AdvanceStage from './components/AdvanceStage';
import MenuPage from './components/MenuPage';
import Instructions from './components/Instructions';
import AboutMe from './components/AboutMe';
import Credits from './components/Credits';

const { height, width } = Dimensions.get('window');
const deviceType = (height / width) > 1.6 ? 'phone' : 'tablet';
let navHeight;
if(deviceType === 'phone'){
  navHeight = 45;
} else {
  navHeight = 20;
}

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={{height: navHeight }}>
      <Scene key="root" tabs={false}>
        <Scene key="login" component={LoginForm} title="" />
        <Scene initial key="levels" component={LevelsPage} title="Levels" />
        <Scene key="game" component={Game} title="Game On" />
        <Scene key="roundReview" component={RoundReview} title="Round Review" />
        <Scene key="advanceStage" component={AdvanceStage} title="Advance Stage" />
        <Scene key="menuPage" component={MenuPage} title="Menu" />
        <Scene key="instructions" component={Instructions} title="Instructions" />
        <Scene key="aboutMe" component={AboutMe} title="About Me" />
        <Scene key="credits" component={Credits} title="Credits" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
