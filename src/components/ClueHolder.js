import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class ClueHolder extends React.Component {
  render(){
    // if(this.props.idx === 2){
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.text}>
    //       {this.props.clue}
    //     </Text>
    //   </View>
    // );
    // } else {
      return (
        <View style={styles.containerLeft}>
          <Text style={styles.text}>
            {this.props.clue}
          </Text>
        </View>
      );
    // }
  }
}

const styles = {
  container: {
    // paddingTop: 3,
    paddingBottom: 5,
    paddingRight: 3,
    width: 280,
    alignItems: 'flex-end',
    // justifyContent: 'center',
    marginTop: 8,
    borderColor: 'orange',
    // borderWidth: 1,
    borderTopWidth: 1,
    // backgroundColor: 'orange',
    borderRadius: 5
  },
  containerLeft: {
    paddingTop: 3,
    paddingBottom: 5,
    paddingRight: 6,
    width: 280,
    // alignItems: 'flex-end',
    // justifyContent: 'center',
    marginTop: 10,
    borderColor: 'orange',
    // borderWidth: 1,
    borderTopWidth: 1,
    // backgroundColor: 'orange',
    borderRadius: 5
  },
  text: {
    fontSize: 24,
    color: 'white',
    // fontFamily: 'RobotoCondensed-Regular',
    fontFamily: 'RobotoCondensed-Italic',
    margin: 5,
    fontStyle: 'italic'
  }
};



export default connect(null, null)(ClueHolder);
