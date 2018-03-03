import React from 'react';
import { Text, View, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import { connect } from 'react-redux';
import { assignLevel } from '../actions';
import Levels from '../games/levels.json';
import lockImage from '../assets/lock.png';

class LevelButton extends React.Component {
  constructor(props){
    super(props);
  }
  onPress(num){
    const levelType = Levels[num].type;
    this.props.assignLevel(num, levelType);
  }

  render(){
    const num = this.props.num;
    const onPress = this.onPress.bind(this, num);

    const { stage, STAGES } = this.props;
    if(STAGES[stage] <= STAGES[Levels[num].stage]){ //not this stage
      return (
        <TouchableOpacity style={styles.lockedLevel}>
          <Image source={lockImage} style={styles.lock} />
        </TouchableOpacity>
      );
    }


    if(num > this.props.nextUnsolvedLevel){ //locked level
      return (
        <TouchableOpacity style={styles.lockedLevel} key={num} >
          <View style={styles.innerLocked}>
            <View style={styles.innerInnerLocked}>
              <Image source={lockImage} style={styles.lock} />
              <Text style={styles.lockedText}>
                {num}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    if(num < this.props.nextUnsolvedLevel){ //solved level
      return (
        <TouchableOpacity onPress={onPress} style={styles.solvedLevel} >
          <View style={styles.innerSolved}>
            <View style={styles.innerInnerSolved}>
              <Text style={styles.solvedText}>
                {num}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

      // check if there's an error here...rendering with opacity somehow
    return ( //nextUnsolvedLevel
      <TouchableOpacity key={num} onPress={onPress} style={styles.level}>
        <View style={styles.innerLevel}>
          <View style={styles.innerInnerLevel}>
            <Text style={styles.levelText}>
              {num}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


}

const styles = {
  //nextUnsolvedLevel
  level: {
    width: 75,
    height: 75,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 2.5,
    margin: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLevel: {
    width: 66,
    height: 66,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerInnerLevel: {
    width: 57,
    height: 57,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'RobotoCondensed-Regular',
  },
  // lockedLevel
  innerInnerLocked: {
    width: 57,
    height: 57,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLocked: {
    width: 66,
    height: 66,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5
  },
  unsolvedLevel: {

  },
  lockedLevel: {
    // opacity: 0.5,
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
  lockedText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'RobotoCondensed-Regular',
    position: 'absolute',
    textAlign: 'center',
  },
  // solved
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
  innerSolved: {
    width: 66,
    height: 66,
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerInnerSolved: {
    width: 57,
    height: 57,
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solvedText: {
    fontSize: 40,
    color: 'blue',
    fontWeight: 'bold',
    fontFamily: 'RobotoCondensed-Regular',
  },
  // lockImage
  lock: {
    width: 90,
    height: 90,
    position: 'absolute',
    // opacity: 0.3
  }
};

const mapStateToProps = state => {
  return {
    nextUnsolvedLevel: state.levels.nextUnsolvedLevel,
    stage: state.levels.stage,
    stages: state.levels.stages
  };
};

export default connect(mapStateToProps, { assignLevel })(LevelButton);
