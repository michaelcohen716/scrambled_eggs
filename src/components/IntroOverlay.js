import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity} from 'react-native';

class IntroOverlay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true
    };
    this.advance = this.advance.bind(this);
  }

  advance(){
    this.setState({ visible: false});
  }

  render(){
    const element = (
      <TouchableOpacity style={styles.overlay} onPress={this.advance}>
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    );

    return (
      <View>
        {this.state.visible ? element : null}
      </View>

    );
  }
}

const styles = {
  overlay: {
    position: 'absolute',
    top: 15,
    right: 50,
    height: 100,
    width: 100,
    borderColor: 'yellow',
    borderWidth: 2,
    backgroundColor: 'gray',
    zIndex: 2,
    opacity: 0.2
  },
  text: {
    fontSize: 24,
    color: 'red',
    zIndex: 3
  }
};

export default connect(null, null)(IntroOverlay);
