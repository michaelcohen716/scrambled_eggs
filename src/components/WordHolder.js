import React from 'react';
import { View } from 'react-native';

class WordHolder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      length: this.props.length
    };
  }

  render(){
    return (
      <View>
        
      </View>
    );
  }
}

export default WordHolder;
