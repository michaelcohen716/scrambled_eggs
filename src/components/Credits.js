import React from 'react';
import { View, Text } from 'react-native';

class Credits extends React.Component {
  render(){
    const { title, titleText, bulletText, bullets, bulletHolder } = styles;
    const artists = ["Alexander Skowalsky", "mikicon", "Deemak Daksina S",
    "Hartley Miller", "Noel Rasendrason", "Oliver Kittler", "Naveesh Khattaer",
    "Jose Manuel de Laa", "Marianna Rossi", "Made by Made", "Oksana Latysheva"];

    const bullet = (artist, idx) => {
      return (
        <View style={bulletHolder} key={idx}>
          <Text style={bulletText}>{'\u2022'} </Text>
          <Text style={bulletText}>{artist}</Text>
        </View>
      );
    };

    const bulletPoints = artists.map((artist, idx) => {
      return (
        bullet(artist, idx)
      );
    });

    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <View style={title}>
          <Text style={titleText}>Images sourced from the Noun Project</Text>
        </View>

        <View style={bullets}>
          {bulletPoints}
        </View>

        <View style={{flex: 3}} />

      </View>
    );
  }
}

const styles = {
  title: {
    flex: 1,
  },
  bulletHolder: {
    marginLeft: 8,
    marginTop: 5
  },
  titleText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 20,
    color: 'white'
  },
  bullets: {
    flex: 3,
    flexDirection: 'column'
  },
  bulletText: {
    color: 'white',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16
  }
};

export default Credits;
