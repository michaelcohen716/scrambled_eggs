import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import LevelButton from './LevelButton';
import Levels from '../games/levels.json';

class LevelsPage extends React.Component {
  constructor(props){
    super(props);
    this.levels = Object.keys(Levels).length; //total levels in game
    this.state = {
      activeLevel: null
    };
  }

  render(){
    let levels = [];
    for (var i = 0; i < this.levels; i++) {
      const thisLevel = <LevelButton num={i+1} key={i}/>;
      levels.push(thisLevel);
    }

    return (
      <View style={styles.parent}>
        {levels}
      </View>
    );
  }
}

const styles = {
  parent: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
};

export default connect(null, null)(LevelsPage);
