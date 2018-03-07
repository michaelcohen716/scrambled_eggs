import React from 'react';
import { Text, View, TouchableOpacity,
        Animated, Easing, Image,
        Modal, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { assignLevel, fireUp } from '../actions';
import Levels from '../games/levels.json';
import lockImage from '../assets/lock.png';

class LevelButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false
    };
    this.renderItemAsk = this.renderItemAsk.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.onPressModal = this.onPressModal.bind(this);
  }

  onPress(num){
    const levelType = Levels[num].type;

    if(this.props.fireUpAvailable){
      this.renderItemAsk();
    } else {
      this.props.assignLevel(num, levelType);
    }
  }

  onPressModal(choice, num){
    const levelType = Levels[num].type;
    if(choice === "y"){
      const itemObject = {
        itemsToggle: this.props.itemsToggle,
        item: "fireUp"
      };
      this.setState({ modalVisible: false });
      this.props.fireUp(itemObject);
      this.props.assignLevel(num, levelType);
    } else if(choice === "n"){
      this.setState({ modalVisible: false });
      this.props.assignLevel(num, levelType);
    }
  }

  renderItemAsk(){
    this.setState({ modalVisible: true});
  }

  renderModal(num){
    const { width } = Dimensions;

    const styles = {
      modalHolder: {
        flex: 1,
        width: width/2,
        flexDirection: 'column'
      },
      questionText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
      },
      questionHolder: {
        flex: 1
      },
      modalButtonHolder: {
        flex: 1,
        flexDirection: 'row',
        width: 200,
        justifyContent: 'center',
        marginBottom: 15
      },
      empty: {
        flex: 3,
        backgroundColor: 'transparent'
      },
      contentHolder: {
        backgroundColor: 'blue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 70,
        marginRight: 70,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5
      },
      yesNoButton: {
        width: 40,
        height: 40,
        margin: 8,
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
    };

    return (
      <Modal animationType="slide" transparent={true}
             visible={this.state.modalVisible}>
        <View style={styles.modalHolder}>
          <View style={styles.empty}/>

          <View style={styles.contentHolder}>

            <View style={styles.questionHolder}>
              <Text style={styles.questionText}>
                Use 'Fire Up'?
              </Text>
            </View>

            <View style={styles.modalButtonHolder}>

              <TouchableOpacity style={styles.yesNoButton} onPress={() =>this.onPressModal("y", num)}>
                <Text style={styles.questionText}>Y</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.yesNoButton} onPress={() => this.onPressModal("n", num)}>
                <Text style={styles.questionText}>N</Text>
              </TouchableOpacity>

            </View>
          </View>

          <View style={styles.empty} />

        </View>
      </Modal>
    );
  }

  render(){
    const num = this.props.num;
    const onPress = this.onPress.bind(this, num);
    const modal = this.renderModal(num);

    const { stages } = this.props;
    // STAGES
    const thisLevelsStage = stages[Levels[num].stage];
    // numeric value of stage

    if(this.props.stageNum < thisLevelsStage){
      return (
        <TouchableOpacity style={styles.lockedLevel}>
          <Image source={lockImage} style={styles.lock} />
          {modal}
        </TouchableOpacity>
      );
    }

    if(num > this.props.nextUnsolvedLevel){ //locked level
      return (
        <TouchableOpacity style={styles.lockedLevel} key={num} >
          <View style={styles.innerLocked}>
            <View style={styles.innerInnerLocked}>
              <Image source={lockImage} style={styles.lock} />
              <Text style={styles.lockedText}>
                {num}
              </Text>
              {modal}

            </View>
          </View>
        </TouchableOpacity>
      );
    }

    if(num < this.props.nextUnsolvedLevel){ //solved level
      return (
        <TouchableOpacity onPress={onPress} style={styles.solvedLevel} >
          <View style={styles.innerSolved}>
            <View style={styles.innerInnerSolved}>
              <Text style={styles.solvedText}>
                {num}
              </Text>
              {modal}

            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return ( //nextUnsolvedLevel
      <TouchableOpacity key={num} onPress={onPress} style={styles.level}>
        <View style={styles.innerLevel}>
          <View style={styles.innerInnerLevel}>
            <Text style={styles.levelText}>
              {num}
            </Text>
            {modal}

          </View>
        </View>
      </TouchableOpacity>
    );
  }


}

const styles = {
  //nextUnsolvedLevel
  level: {
    width: 75,
    height: 75,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 2.5,
    margin: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLevel: {
    width: 66,
    height: 66,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerInnerLevel: {
    width: 57,
    height: 57,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'RobotoCondensed-Regular',
  },
  // lockedLevel
  innerInnerLocked: {
    width: 57,
    height: 57,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLocked: {
    width: 66,
    height: 66,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5
  },
  unsolvedLevel: {

  },
  lockedLevel: {
    // opacity: 0.5,
    width: 75,
    height: 75,
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 2.5,
    margin: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  lockedText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'RobotoCondensed-Regular',
    position: 'absolute',
    textAlign: 'center',
  },
  // solved
  solvedLevel: {
    width: 75,
    height: 75,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 2.5,
    margin: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerSolved: {
    width: 66,
    height: 66,
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerInnerSolved: {
    width: 57,
    height: 57,
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solvedText: {
    fontSize: 40,
    color: 'blue',
    fontWeight: 'bold',
    fontFamily: 'RobotoCondensed-Regular',
  },
  // lockImage
  lock: {
    width: 90,
    height: 90,
    position: 'absolute',
  }
};

const mapStateToProps = state => {
  return {
    nextUnsolvedLevel: state.levels.nextUnsolvedLevel,
    stages: state.levels.stages,
    stageNum: state.levels.stageNum,
    fireUpAvailable: state.items.itemsToggle.fireUp,
    itemsToggle: state.items.itemsToggle,
  };
};

export default connect(mapStateToProps, {
  assignLevel, fireUp
})(LevelButton);
