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
      stage: this.props.stage,
      stageDropdown: 0,
      dropdownShowing: false,
    };
    this.levels = Object.keys(Levels); //all levels in game
    this.stages = Object.keys(this.props.stages);
    this.levelFrameworks = this.levelFrameworks();

    this.numLevels = this.levels.length;
    this.tiltTriangle = this.tiltTriangle.bind(this);
  }

  levelFrameworks(){
    let frameworks = [];
    let framework = [];
    for (var i = 0; i < this.numLevels; i++) {
      const level = <LevelButton num={i+1} key={i} />
      framework.push(level);

      if((i+1) % 20 === 0){
        frameworks.push(framework);
        framework = [];
      }
    }
  }

  dropdownSelect(stageIdx){
    this.setState({ stageDropdown: stageIdx})
  }

  adjustFrame(style){
    style.top -= 24;
    style.left -= 130;
    return style;
  }

  tiltTriangle(){
    this.setState({ dropdownShowing: !this.state.dropdownShowing})
  }

  render(){
    const levels = this.levels.map((level, idx) => {
      return (
        <LevelButton num={idx+1} key={idx} />
      );
    });

    const triangle = this.state.dropdownShowing ? (
      <View style={styles.triangleLeft} />
    ) : (
      <View style={styles.triangle} />
    )

    return (
      <View style={styles.parent} animationOut={'fadeOut'}>

        <View style={styles.info}>

          <View style={styles.topLeft}>

            <TouchableWithoutFeedback style={styles.stageName}>
              <View>
                <Text style={styles.stage}>
                  {this.stages[this.state.stageDropdown]}
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <View>
              <ModalDropdown options={["Sunny Side Up", "Hard Boiled", "Over Easy"]} defaultIndex={0}
                onSelect={this.dropdownSelect.bind(this)} dropdownStyle={styles.dropdownStyle}
                adjustFrame={style => this.adjustFrame(style)} animated={true} dropdownTextStyle={styles.button}
                dropdownTextHighlightStyle={styles.highlightStyle} onDropdownWillShow={this.tiltTriangle}
                onDropdownWillHide={this.tiltTriangle}>
                {triangle}
              </ModalDropdown>
            </View>
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
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 20,
    borderBottomColor: 'blue',
    transform: [
      {rotate: '180deg'}
    ],
    marginLeft: 4,
    marginTop: 7,
  },
  triangleLeft: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 20,
    borderBottomColor: 'blue',
    transform: [
      {rotate: '272deg'}
    ],
    marginLeft: 4,
    marginTop: 7,
  },
  highlightStyle: {
    fontSize: 18,
    fontFamily: 'RobotoCondensed-Regular',
    backgroundColor: 'blue',
    color: 'white'
  },
  dropdownStyle: {
    // width: 116,
    height: 150,
    marginRight: 16
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 18,
    fontFamily: 'RobotoCondensed-Regular',
    width: 132,
  },
  outerDropdown: {
    // position: 'absolute',
    // right: 2,
    // marginRight: 80
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
    flex: 1,
  },
  topLeft: {
    flex: 2,
    marginLeft: 7,
    flexDirection: 'row',
    position: 'relative'
  },
  stageName: {
    height: 30,
    width: 30,
    flex: 3,
    // marginLeft: 13,

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
    backgroundColor: 'black',
    borderBottomWidth: 2,
    borderColor: 'white'
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
    fontSize: 23,
    fontFamily: 'RobotoCondensed-Regular',
    marginLeft: 7,
    marginTop: 2,
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
