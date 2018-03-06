import React from 'react';
import { View, ScrollView, Text,
        Image, Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import Levels from '../games/levels.json';
import LevelButton from './LevelButton';
import FryingPan from './FryingPan';

class LevelsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeLevel: null,
      stage: this.props.stage
    };
    this.levels = Object.keys(Levels); //all levels in game
    this.stages = Object.keys(this.props.stages);
    this.numLevels = this.levels.length;
  }

  render(){
    const levels = this.levels.map((level, idx) => {
      return (
        <LevelButton num={idx+1} key={idx} />
      );
    });

    const triangle = (
      <View style={styles.triangle} />
    )

    return (
      <View style={styles.parent} animationOut={'fadeOut'}>

        <View style={styles.info}>

          <View style={styles.topLeft}>

            <TouchableWithoutFeedback style={styles.dropdownLever}>
              <View>
                <Text style={styles.stage}>
                  {this.props.stage}
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <ModalDropdown options={["Sunny Side Up", "Hard Boiled", "Over Easy"]} style={styles.triangle}>
            </ModalDropdown>
          </View>

          <View style={styles.topRight}>
          </View>

        </View>

        <View style={styles.levels}>
          <ScrollView horizontal={false} contentContainerStyle={styles.contentContainerStyle} >
            {levels}
          </ScrollView>
        </View>

        <FryingPan />

      </View>
    );
  }
}

const styles = {
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue',
    transform: [
      {rotate: '180deg'}
    ],
    marginLeft: 3,
    marginTop: 5
  },
  modalDropdown: {
    flex: 1,
    backgroundColor: 'blue',
  },
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  topRight:{
    flex: 1
  },
  topLeft: {
    flex: 1,
    borderColor: 'yellow',
    borderWidth: 1,
    marginLeft: 7,
    flexDirection: 'row'
  },
  dropdownLever: {
    height: 30,
    width: 30,
    flex: 1,
    marginLeft: 13
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-start',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: 'black'
  },
  levels: {
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'flex-start',
    flex: 1,
    height: 300
  },
  eggcoin: {
    marginRight: 17,
    marginTop: 2,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'RobotoCondensed-Regular',
    color: 'white'
  },
  goldEgg: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginLeft: 3,
    marginTop: 2
  },
  stage: {
    fontSize: 21,
    fontFamily: 'RobotoCondensed-Regular',
    marginLeft: 7,
    // marginTop: 3,
    color: 'white'
  },

};

const mapStateToProps = state => {
  return {
    eggcoin: state.score.userEggcoin,
    stage: state.levels.stage,
    stages: state.levels.stages
  };
};

export default connect(mapStateToProps, null)(LevelsPage);
