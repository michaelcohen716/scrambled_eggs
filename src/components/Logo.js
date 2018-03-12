import React from 'react';
import { Text, View } from 'react-native';

class Logo extends React.Component {
  render(){
    return (
      <View style={styles.logoHolder}>
        <View style={styles.logoTextHolder}>
          <Text style={styles.circleText}>Scrambled</Text>
        </View>
        <View style={styles.logoTextHolder2}>
          <Text style={styles.circleText2}>Eggs</Text>
        </View>
        <View style={styles.circleLeft} />
        <View style={styles.circleRight} />
      </View>
    );
  }
}

const styles = {
  logoHolder: {
    height: 180,
    backgroundColor: 'black'
    // flexDirection: 'row'
  },
  logoTextHolder: {
    zIndex: 3,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 35,
    left: 94,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logoTextHolder2: {
    zIndex: 3,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 78,
    left: 145,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  circleText2: {
    fontFamily: 'RobotoCondensed-Italic',
    fontSize: 40,
    color: 'white',
  },
  circleText: {
    fontFamily: 'RobotoCondensed-Italic',
    fontSize: 42,
    color: 'white',
  },
  circleLeft: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'blue',
    position: 'absolute',
    top: 20,
    left: 70,
    borderColor: 'black',
    borderWidth: 3,
    zIndex: 1
  },
  circleRight: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'red',
    position: 'absolute',
    top: 20,
    right: 70,
    borderColor: 'black',
    borderWidth: 3,
    zIndex: 1
  },
};

export default Logo;
