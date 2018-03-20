import React from 'react';
import { View, Text, Image, Linking, TouchableWithoutFeedback } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import MeImage from '../assets/me_image.jpeg';

class AboutMe extends React.Component {
  render(){
    const { bigText, smallText, top, imageHolder, image, blueText } = styles;
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <View style={top}>
          <View style={{flex: 2}}>
            <Text style={bigText}>Michael J. Cohen</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={smallText}>Software Developer living in NYC</Text>
          </View>
          <View style={{flex: 1, marginTop: 12}}>
            <Text style={blueText} onPress={ ()=> Linking.openURL('https://www.linkedin.com/in/michaeljcohen716/') } >
              Connect with me
            </Text>

          </View>
        </View>

        <View style={imageHolder}>
          <View style={{width: 160, height: 280}}>
            <Image source={MeImage} style={image} />
          </View>
        </View>

        <View style={styles.filler}>

        </View>
      </View>
    );
  }
}

const styles = {
  bigText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  blueText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 22,
    color: 'blue',
    fontWeight: 'bold'
  },
  smallText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 22,
    color: 'white',
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10
  },
  imageHolder: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filler: {
    flex: 2
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    borderRadius: 5
  }
};

export default AboutMe;
