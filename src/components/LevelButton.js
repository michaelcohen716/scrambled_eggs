import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { assignLevel } from '../actions';

class LevelButton extends React.Component {
  onPress(num){
    this.props.assignLevel(num);
  }

  onFakePress(num){
    console.log(num);
    console.log(this.props);
  }

  render(){
    console.log(this.props);
    const num = this.props.num;
    const onPress = this.onPress.bind(this, num);
    const onFakePress = this.onFakePress.bind(this, num);

    if(num > this.props.nextUnsolvedLevel){
      return (
        <TouchableOpacity style={styles.lockedLevel} key={num} onPress={onFakePress}>
          <Text style={styles.lockedText}>
            {num}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.level} key={num} onPress={onPress}>
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
    fontWeight: 'bold'
  }
};

const mapStateToProps = state => {
  return {
    nextUnsolvedLevel: state.levels.nextUnsolvedLevel
  };
};

export default connect(mapStateToProps, { assignLevel })(LevelButton);
