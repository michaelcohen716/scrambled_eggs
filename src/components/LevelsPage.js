import React from 'react';
import { View, ScrollView, Text,
        Image, Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ModalDropdown from 'react-native-modal-dropdown';
import Levels from '../games/levels.json';
import LevelButton from './LevelButton';
import LevelsIntro from './LevelsIntro';
import FryingPan from './FryingPan';
import houseLogo from '../assets/red_house.png';

class LevelsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeLevel: null,
      stage: this.props.stage,
      stageDropdown: this.props.stageNum - 1,
      dropdownShowing: false,
      introVisible: false
    };
    this.levels = Object.keys(Levels); //all levels in game
    this.stages = Object.keys(this.props.stages);
    this.numLevels = this.levels.length;
    this.frameworks = this.levelFrameworks();
    this.levelFrameworks = this.levelFrameworks.bind(this);

    this.tiltTriangle = this.tiltTriangle.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.stageNum !== this.props.stageNum){
      this.setState({ stageDropdown: nextProps.stageNum - 1})
    }

    if(nextProps.activeLevel === 1 && !nextProps.activeLevelAttempted && this.props.auth){
      // debugger
      this.setState({ introVisible: true }, () => {
        this.setState({ introVisible: false}, () => {
          this.setState({ introVisible: true });
        })
      } );
    }

  }

  levelFrameworks(){
    let frameworks = [];

    for (var i = 0; i < this.numLevels / 20; i++) {
      const framework = [];
      for (var j = 0; j < 20; j++) {
        if(((20 * i) + j) === this.numLevels){
          break;
        }
        const level = <LevelButton num={(20 * i) + j + 1} key={(20*i)+j} />
        framework.push(level);
      }
      frameworks.push(framework);
    }

    return frameworks;
  }

  dropdownSelect(stageIdx){
    this.setState({ stageDropdown: stageIdx})
  }

  adjustFrame(style){
    style.left -= 142;
    return style;
  }

  tiltTriangle(){
    this.setState({ dropdownShowing: !this.state.dropdownShowing})
  }

  render(){
    const levels = this.frameworks[this.state.stageDropdown];

    const triangle = this.state.dropdownShowing ? (
      <View style={styles.triangleLeft} />
    ) : (
      <View style={styles.triangle} />
    )

    const options = ["Sunny Side Up", "Over Easy", "Hard Boiled", "Frittata", "Scrambled Eggs"];

    return (
      <View style={styles.parent} animationOut={'fadeOut'}>

        <View style={styles.info}>

          {this.state.introVisible ? <LevelsIntro /> : null}

          <View style={styles.topLeft}>

            <View style={styles.stageName}>
              <View style={styles.stageSpot}>
                <Text style={styles.stage}>
                  {this.stages[this.state.stageDropdown]}
                </Text>
              </View>
            </View>

            <View style={styles.dropdownHolder}>
              <ModalDropdown options={options} defaultIndex={this.props.stageNum - 1}
                onSelect={this.dropdownSelect.bind(this)} dropdownStyle={styles.dropdownStyle}
                adjustFrame={style => this.adjustFrame(style)} animated={true} dropdownTextStyle={styles.button}
                dropdownTextHighlightStyle={styles.highlightStyle} onDropdownWillShow={this.tiltTriangle}
                onDropdownWillHide={this.tiltTriangle}>
                {triangle}
              </ModalDropdown>
            </View>
          </View>

          <View style={styles.topRight}>
            <View style={{flex: 2}}>
            </View>

            <View style={styles.buttonHolder}>
              <TouchableWithoutFeedback  style={styles.houseButton} onPress={() => Actions.menuPage()}>
                <Image source={houseLogo} style={styles.houseLogo} />
              </TouchableWithoutFeedback>
            </View>
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
  dropdownHolder: {
    flex: 2
  },
  buttonHolder: {
    flex: 1,
    marginRight: 15
  },
  houseLogo: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    marginBottom: 1
  },
  houseButton: {
    height: 35,
    width: 65,
    borderColor: 'silver',
    borderWidth: 2,
    flex: 1,
    opacity: 0,
  },
  topRight:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
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
    position: 'absolute',
    top: 9,
    left: -2
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
    position: 'absolute',
    top: 9,
    left: -8
  },
  stageSpot: {
    position: 'absolute',
    top: 2,
    left: 9
  },
  highlightStyle: {
    fontSize: 18,
    fontFamily: 'RobotoCondensed-Regular',
    backgroundColor: 'blue',
    color: 'white'
  },
  dropdownStyle: {
    height: 180,
    marginRight: 16,
    elevation: 4,
    borderColor: 'white',
    borderWidth: 2
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 18,
    fontFamily: 'RobotoCondensed-Regular',
    width: 132,
  },
  modalDropdown: {
    flex: 1,
    backgroundColor: 'blue',
  },
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  topLeft: {
    flex: 2,
    marginLeft: 7,
    flexDirection: 'row',
    position: 'relative'
  },
  stageName: {
    flex: 3,
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
    marginTop: 2,
    color: 'white'
  },

};

const mapStateToProps = state => {
  return {
    eggcoin: state.score.userEggcoin,
    stage: state.levels.stage,
    stages: state.levels.stages,
    stageNum: state.levels.stageNum,
    activeLevel: state.levels.activeLevel,
    activeLevelAttempted: state.score.activeLevelAttempted,
    auth: state.auth.email
  };
};

export default connect(mapStateToProps, null)(LevelsPage);
