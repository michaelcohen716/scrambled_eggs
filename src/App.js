import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { View } from 'react-native';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import { Header } from './components/common';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDhF5_F0lEeIG861rnBXXO0fR2lKfgZRMY",
      authDomain: "scrambled-eggs-2f085.firebaseapp.com",
      databaseURL: "https://scrambled-eggs-2f085.firebaseio.com",
      projectId: "scrambled-eggs-2f085",
      storageBucket: "scrambled-eggs-2f085.appspot.com",
      messagingSenderId: "917876786457"
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store} style={styles.container}>
        <Router headerStyle={styles.header} />
      </Provider>
    );
  }
}

const styles = {
  header: {
    backgroundColor: '#5cafec'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }
};

export default App;
