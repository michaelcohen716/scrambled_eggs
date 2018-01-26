import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

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
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
