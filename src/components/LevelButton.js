import React from 'react';
import { Text, View, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import { connect } from 'react-redux';
import { assignLevel } from '../actions';
import Levels from '../games/levels.json';
import lockImage from '../assets/lock.png';

class LevelButton extends React.Component {
  constructor(){
    super();
  }
  onPress(num){
    const levelType = Levels[num].type;
    this.props.assignLevel(num, levelType);
  }

  render(){
    const num = this.props.num;
    const onPress = this.onPress.bind(this, num);

    if(this.props.stage !== Levels[num].stage){ //not this stage
      return (
        <TouchableOpacity style={styles.lockedLevel}>
          <Image source={lockImage} style={styles.lock} />
        </TouchableOpacity>
      );
    }

    if(num > this.props.nextUnsolvedLevel){ //unsolved level
      return (
        <TouchableOpacity style={styles.lockedLevel} key={num} >
            <Image source={lockImage} style={styles.lock} />
            <Text style={styles.lockedText}>
              {num}
            </Text>
        </TouchableOpacity>
      );
    }

    if(num < this.props.nextUnsolvedLevel){ //solved level
      return (
        <TouchableOpacity onPress={onPress} style={styles.solvedLevel} >
          <Text style={styles.solvedText}>
            {num}
          </Text>
        </TouchableOpacity>
      );
    }


    return ( //nextUnsolvedLevel
        <TouchableOpacity key={num} onPress={onPress} style={styles.level}>
          <Text style={styles.text}>
            {num}
          </Text>
        </TouchableOpacity>

    );
  }
}

const styles = {
  level: {
    width: 75,
    height: 75,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 2.5,
    margin: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lockedLevel: {
    width: 75,
    height: 75,
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 2.5,
    margin: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solvedLevel: {
    width: 75,
    height: 75,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 2.5,
    margin: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'blockbrokers'
  },
  lockedText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'blockbrokers',
    position: 'absolute',
    textAlign: 'center',
    top: 11,
    opacity: 0.7
  },
  solvedText: {
    fontSize: 28,
    color: 'blue',
    fontWeight: 'bold',
    fontFamily: 'blockbrokers'
  },
  lock: {
    width: 90,
    height: 90,
    position: 'absolute',
    opacity: 0.3
  }
};

const mapStateToProps = state => {
  return {
    nextUnsolvedLevel: state.levels.nextUnsolvedLevel,
    stage: state.levels.stage
  };
};

export default connect(mapStateToProps, { assignLevel })(LevelButton);
