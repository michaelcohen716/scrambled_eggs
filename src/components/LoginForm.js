import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {
  emailChanged, passwordChanged,
  loginUser,
  signupUser
}
from '../actions';
import Logo from './Logo';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      user: null
    };
  }

  // componentDidMount(){
  //   this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
  //     this.setState({
  //       loading: false,
  //       user
  //     })
  //   })
  // }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onSignupPress() {
    const { email, password } = this.props;
    this.props.signupUser({ email, password });

  }

  renderAuthButtons() {
    if (this.props.loading) {
      return (
        <View style={styles.spinner} >
          <Spinner size="large" />
        </View>

      )
    }

    return (
      <CardSection>
        <Button onPress={this.onLoginPress.bind(this)}>
          Login
        </Button>
        <Button onPress={this.onSignupPress.bind(this)}>
          Sign Up
        </Button>
      </CardSection>
    );
  }

  render() {
    return (
      <View>
        <Logo />

        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              />
          </CardSection>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          {this.renderAuthButtons()}

        </Card>


      </View>
    );
  }
}


const styles = {
  filler: {
    height: 245,
    backgroundColor: 'black'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  spinner: {
    marginTop: 10
  },

};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};


export default connect(mapStateToProps, {
  emailChanged, passwordChanged,
  loginUser,
  signupUser
})(LoginForm);
