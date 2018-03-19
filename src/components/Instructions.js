import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Instructions extends React.Component {
  render(){
    const { holder, titleHolder, titleText, bulletText, infoHolder } = styles;
      return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View style={holder}>
            <View style={titleHolder}>
              <Text style={titleText}>General Rules</Text>
            </View>

            <View style={infoHolder}>
              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>Earn the most eggcoin by solving puzzles fastest</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>You only keep your winnings if you finish the puzzle</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>But don't stop trying!</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>Buy a power-up if you're stuck</Text>
              </View>

            </View>

          </View>

          <View style={holder}>
            <View style={titleHolder}>
              <Text style={titleText}>Jumbles</Text>
            </View>

            <View style={infoHolder}>
              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>Find all the words with all the letters</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>Shorter words are fun. But not for this puzzle</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>No proper nouns</Text>
              </View>
            </View>

          </View>

          <View style={holder}>
            <View style={titleHolder}>
              <Text style={titleText}>Scrambles</Text>
            </View>

            <View style={infoHolder}>
              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>Find the defined word using the assorted letters</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>Do it again with a 1-letter twist</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>Try working backwards if you're stuck</Text>
              </View>
            </View>

          </View>

          <View style={holder}>
            <View style={titleHolder}>
              <Text style={titleText}>Ladders</Text>
            </View>

            <View style={infoHolder}>
              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>Find any word using all given letters</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>Use those letters to find a word one letter shorter</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={bulletText}>{'\u2022'} </Text>
                <Text style={bulletText}>And then do it again. There are a few possible answers</Text>
              </View>
            </View>

          </View>
        </View>
      );
    }
  }

const styles = {
  holder: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 15
  },
  titleHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoHolder: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 20,
    color: 'white'
  },
  bulletText: {
    color: 'white',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16
  }
};


export default Instructions;
