import React from 'react';
import { Text, View, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import { connect } from 'react-redux';
import { assignLevel } from '../actions';
import lockImage from '../assets/lock.png';

class LevelButton extends React.Component {
  constructor(){
    super();
  }
  onPress(num){
    this.props.assignLevel(num);
  }

  render(){
    const num = this.props.num;
    const onPress = this.onPress.bind(this, num);

    if(num > this.props.nextUnsolvedLevel){
      return (
        <TouchableOpacity style={styles.lockedLevel} key={num} >
            <Image source={lockImage} style={styles.lock} />
            <Text style={styles.lockedText}>
              {num}
            </Text>
        </TouchableOpacity>
      );
    }
    // <View style={{flex: 1}}>
    // </View>

    return (
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
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 2.5,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lockedLevel: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 2.5,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  lockedText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center',
    top: 5,
    opacity: 0.7
  },
  lock: {
    width: 50,
    height: 50,
    position: 'absolute',
    opacity: 0.3
  }
};

const mapStateToProps = state => {
  return {
    nextUnsolvedLevel: state.levels.nextUnsolvedLevel
  };
};

export default connect(mapStateToProps, { assignLevel })(LevelButton);
