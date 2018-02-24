import React from 'react';
import { Text } from 'react-native';
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
      return <Spinner size="large" />;
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
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
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
