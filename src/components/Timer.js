import React from 'react';
import { View, Text } from 'react-native';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      seconds: this.props.seconds,
      timer: null
    };
    this.initialTime = this.props.seconds;
    this.tick = this.tick.bind(this);
  }

  componentDidMount(){
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  tick(){
    this.setState({ seconds: this.state.seconds - 1});
  }

  render(){
    var fillerUnit = 1 / this.initialTime; // 1/30 = 1 / 30
    var styles = {
      filler: {
        backgroundColor: 'black',
        height: 5,
        flex: fillerUnit
      },
      holder: {
        borderColor: 'orange',
        borderWidth: 1,
        height: 6,
        backgroundColor: 'white',
        flexDirection: 'row-reverse',
      }
    };

    const timeElapsed = this.initialTime - this.state.seconds; // 20 = 30 - 10

    const filler = (id) => (
      <View style={styles.filler} key={id}>
      </View>
    );

    let fillers = [];
    for (var i = 0; i < timeElapsed; i++) {
      const nextFiller = filler(i);
      fillers.push(nextFiller);
    }

    return (
      <View style={styles.holder}>
        {fillers}
      </View>
    );
  }
}

export default Timer;
