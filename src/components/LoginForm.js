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

class LoginForm extends React.Component {
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
      return <Spinner style={styles.spinner} size="large" />;
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
        <View style={styles.logoHolder}>
          <View style={styles.logoTextHolder}>
            <Text style={styles.circleText}>Scrambled</Text>
            <Text style={styles.circleText2}>Eggs</Text>
          </View>
          <View style={styles.circleLeft} />
          <View style={styles.circleRight} />
        </View>

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
  logoTextHolder: {
    zIndex: 3,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 28,
    left: 94,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  circleText2: {
    fontFamily: 'RobotoCondensed-Italic',
    fontSize: 40,
    color: 'white',
  },
  circleText: {
    fontFamily: 'RobotoCondensed-Italic',
    fontSize: 42,
    color: 'white',
  },
  circleLeft: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'blue',
    position: 'absolute',
    top: 20,
    left: 70,
    borderColor: 'black',
    borderWidth: 3,
    zIndex: 1
  },
  circleRight: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'red',
    position: 'absolute',
    top: 20,
    right: 70,
    borderColor: 'black',
    borderWidth: 3,
    zIndex: 1
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  spinner: {
    marginTop: 10
  },
  logoHolder: {
    height: 180,
    // flexDirection: 'row'
  }
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
