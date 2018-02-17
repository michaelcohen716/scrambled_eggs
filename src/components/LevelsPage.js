import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { assignLevel } from '../actions';
import LevelButton from './LevelButton';

class LevelsPage extends React.Component {
  constructor(props){
    super(props);
    this.levels = 2;
    this.state = {
      activeLevel: 1
    };
  }

  onPress(num){
    console.log(this.props);
    this.props.assignLevel(num);
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

export default connect(null, { assignLevel })(LevelsPage);
