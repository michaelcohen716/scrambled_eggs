import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import InfoBar from './InfoBar';
import { spendEggcoin } from '../actions';

class AdvanceStage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initialTap: false
    };
    this.proceed = this.proceed.bind(this);
  }

  proceed(){
    if(!this.state.initialTap){
      this.setState({ initialTap: true});
    } else {
      this.props.spendEggcoin(2000); //advance stage

      setTimeout(() => {
        Actions.levels({ type:'reset' });

      }, 1400);
    }
  }

  render(){
    const buttonText = this.state.initialTap ? (
      '2000 Eggcoin'
    ) : (
      `Unlock ${this.props.stage}`
    );

    return (
      <View style={styles.container}>
        <InfoBar advanceStagePage={true} />

        <View style={styles.inner}>

          <Text style={styles.text}>
            You advanced to the next stage:
          </Text>

          <Text style={styles.largerText}>
            {this.props.stage}
          </Text>

          <TouchableOpacity onPress={this.proceed} style={styles.proceed}>
            <Text style={styles.buttonText}>
              {buttonText}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    flex: 1
  },
  inner: {
    marginTop: 35
  },
  text: {
    fontSize: 20,
    color: 'blue',
    margin: 5,
    textAlign: 'center'
  },
  largerText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'blue',
    margin: 15,
    textAlign: 'center'
  },
  proceed: {
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
};

const mapStateToProps = state => {
  return {
    stage: state.levels.stage
  };
};

export default connect(mapStateToProps, { spendEggcoin })(AdvanceStage);
