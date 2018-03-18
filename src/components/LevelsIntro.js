import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Logo from './Logo';

class LevelsIntro extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      introModal: 1,
      introVisible: false
    };
    this.advance = this.advance.bind(this);
    this.introModal1 = this.introModal1.bind(this);
    this.introModal2 = this.introModal2.bind(this);
    this.introModal3 = this.introModal3.bind(this);
  }

  advance(){
    this.setState({ introModal: this.state.introModal + 1 });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.activeLevel === 1 && !nextProps.activeLevelAttempted){
      this.setState({ introVisible: true});
    }
  }

  componentDidMount(){
    if(this.props.activeLevel === 1 && !this.props.activeLevelAttempted){
      this.setState({ introVisible: true });
    }
  }

  introModal3(){
    const styles = {
      topFiller: {
        flex: 22,
        backgroundColor: 'black',
        opacity: 0.9
      },
      messageHolder: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: 'black',
        opacity: 0.9,
        alignItems: 'flex-end',
        justifyContent: 'space-between'

      },
      bottomBar: {
        flex: 5,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'transparent'
      },
      messageText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
      },
      gotIt: {
        flex: 4,
        backgroundColor: 'black',
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      advanceHolder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 35,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 4,
        marginTop: 8,
        marginRight: 5
      },
      advanceText: {
        color: 'white',
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 18,
      }
    };

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 3}} />
          <View style={styles.topFiller} />

          <View style={styles.gotIt}>
            <TouchableOpacity style={styles.advanceHolder} onPress={this.advance}>
              <Text style={styles.advanceText}>Got it</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.messageHolder}>
            <View style={{ marginLeft: 14, marginBottom: 5 }}>
              <Text style={styles.messageText}>
                Power-ups
              </Text>
            </View>

            <View style={{ marginRight: 8, marginBottom: 5 }}>
              <Text style={styles.messageText}>
                Eggcoin balance
              </Text>
            </View>
          </View>

          <View style={styles.bottomBar} />

        </View>
      </Modal>
    );
  }

  introModal2(){
    const styles = {
      topBarHolder: {
        flex: 3,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'transparent'
      },
      messageHolder: {
        flex: 3,
        backgroundColor: 'black',
        opacity: 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      messageText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
      },
      marginLeft: {
        marginLeft: 16,
        marginTop: 5
      },
      marginRight: {
        marginRight: 17,
        marginTop: 5
      },
      filler: {
        flex: 33,
        backgroundColor: 'black',
        opacity: 0.9
      },
      advanceHolder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 35,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 4,
        marginTop: 8,
        marginRight: 5
      },
      advanceText: {
        color: 'white',
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 18,
      },
      gotIt: {
        flex: 4,
        backgroundColor: 'black',
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'flex-end'
      }
    };

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{flex: 4}} />
          <View style={styles.topBarHolder} />

          <View style={styles.messageHolder}>
            <View style={styles.marginLeft}>
              <Text style={styles.messageText}>
                Game Stage
              </Text>
            </View>

            <View style={styles.marginRight}>
              <Text style={styles.messageText}>
                Menu
              </Text>
            </View>

          </View>

          <View style={styles.gotIt}>
            <TouchableOpacity style={styles.advanceHolder} onPress={this.advance}>
              <Text style={styles.advanceText}>Got it</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filler} />
        </View>
      </Modal>
    );
  }

  introModal1(){
    const styles = {
      messageHolder: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'black',
        opacity: 0.8
      },
      message: {
        backgroundColor: 'blue',
        width: 300,
        height: 100,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
      },
      messageText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 25,
        color: 'white'
      },
      tourButton: {
        backgroundColor: 'blue',
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 2
      },
      tourText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 24,
        color: 'white'
      }
    };

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{flex: 4}} />
            <View style={{flex: 4}}>
              <Logo style={{backgroundColor: 'black', opacity: 0.8}}/>
            </View>
            <View style={styles.messageHolder}>
              <TouchableOpacity style={styles.tourButton} onPress={this.advance}>
                <Text style={styles.tourText}>Take a tour</Text>
              </TouchableOpacity>
            </View>
          <View style={{flex: 6}} />
        </View>
      </Modal>
    );
  }

  render(){
    return (
      <View>
        {this.state.introModal === 1 ? this.introModal1() : null}
        {this.state.introModal === 2 ? this.introModal2() : null}
        {this.state.introModal === 3 ? this.introModal3() : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeLevel: state.levels.activeLevel,
    activeLevelAttempted: state.score.activeLevelAttempted
  };
};

export default connect(mapStateToProps, null)(LevelsIntro);
