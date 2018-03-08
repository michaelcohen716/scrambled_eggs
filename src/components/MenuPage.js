import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class MenuPage extends React.Component {
  render(){
    return (
      <View style={styles.parent}>

      </View>
    );
  }
}

const styles = {
  parent: {
    flex: 1
  }
};

export default connect(null, null)(MenuPage);
