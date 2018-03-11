import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity,
        Image, Modal, Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import InfoBar from './InfoBar';
import EggcoinMarket from './EggcoinMarket';
import { spendEggcoin } from '../actions';
import SunnySideUp from '../assets/sunny_side_up.png';
import HardBoiled from '../assets/hard_boiled.png';
import OverEasy from '../assets/over_easy.png';
import goldCoin from '../assets/goldCoin.png';

class AdvanceStage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initialTap: false,
      modalVisible: false
    };
    this.proceed = this.proceed.bind(this);
  }

  proceed(){
    if(!this.state.initialTap){
      this.setState({ initialTap: true});
    } else {

      if(this.props.eggcoin > 10000){
        this.props.spendEggcoin(10000, this.props.eggcoin); //advance stage

        setTimeout(() => {
          Actions.levels({ type:'reset' });

        }, 1400);
      } else {
        this.setState({ initialTap: false });
        this.setState({ modalVisible: true });
      }
    }
  }

  render(){
    const { stage } = this.props;

    const buttonText = this.state.initialTap ? (
      <View style={styles.eggcoinHolder}>
        <Text style={[styles.buttonText, styles.eggcoinText]}>
          10,000
        </Text>
        <Image source={goldCoin} style={styles.eggcoin} />
      </View>
    ) : (
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.buttonText}>
          Unlock
        </Text>
        <Text style={styles.buttonText}>
          {this.props.stage}
        </Text>
      </View>
    );

    let image;
    if(stage === "Sunny Side Up"){
      image = SunnySideUp;
    } else if(stage === "Hard Boiled"){
      image = HardBoiled;
    } else if(stage === "Over Easy"){
      image = OverEasy;
    }

    return (
      <View style={styles.container}>
        <InfoBar advanceStagePage={true} />

        {this.state.modalVisible ?
          <EggcoinMarket visible={this.state.modalVisible}/> : null}

        <View style={styles.stage}>

          <View style={styles.advanced}>
            <View style={{flex: 1}}>
              <Text style={styles.largerText}>
                {this.props.stage}
              </Text>
            </View>
          </View>

          <View style={styles.stagePic}>
            <View style={styles.picHolder}>
              <Image source={image} style={styles.image}/>
            </View>
          </View>

          <View style={{flex: 3}}>
            <View style={styles.proceedHolder}>
              <TouchableOpacity onPress={this.proceed} style={styles.proceed}>
                {buttonText}
              </TouchableOpacity>
            </View>

            <View style={styles.proceedHolder2}>
              <TouchableOpacity style={styles.proceed} onPress={() => Actions.levels()}>
                <Text style={styles.buttonText}>
                  {this.props.lastStage}
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={{flex: 1, backgroundColor: 'black'}}>
          </View>
        </View>

      </View>
    );
  }
}

const styles = {
  eggcoinHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eggcoinText: {
    fontSize: 30,
    fontFamily: 'RobotoCondensed-Regular'
  },
  eggcoin: {
    height: 18,
    width: 18,
    marginTop: 5,
    marginLeft: 3
  },
  proceedHolder: {
    flex: 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  proceedHolder2: {
    flex: 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  },
  advanced: {
    flex: 1
  },
  stage: {
    flex:1
  },
  picHolder: {
    width: 130,
    height: 130
  },
  stagePic: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flexDirection: 'column',
    flex: 1
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
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
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    height: 78,
    width: 150
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'RobotoCondensed-Regular'
  },
};

const mapStateToProps = state => {
  return {
    stage: state.levels.stage,
    eggcoin: state.score.userEggcoin,
    lastStage: state.levels.lastStage
  };
};

export default connect(mapStateToProps, { spendEggcoin })(AdvanceStage);
