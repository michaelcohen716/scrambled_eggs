import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  CREATE_USER
} from './types';

// user input state change
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

// on signup button press
export const signupUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signupUserSuccess(dispatch, user))
      .catch((error) => console.log(error));
      // .catch needed for email-already-taken error
  }
}

const signupUserSuccess = (dispatch, user) => {
    Actions.levels({ type: 'reset'});

    dispatch({
      type: SIGNUP_USER_SUCCESS,
      payload: user
    });
    createUser(dispatch);

};

const createUser = (dispatch) => {
  dispatch({ type: CREATE_USER })

  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}`)
    .set({ phone: '323-323-3232'});

  // default user game info
  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .set({
      eggcoin: 1000,
      activeLevel: 1,
      activeLevelAttempted: false
    })
}

// on login button press
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch))
  }
};


const loginUserSuccess = (dispatch, user) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .once('value', (snapshot) => {

    const eggcoin = snapshot.val().eggcoin;
    const activeLevel = snapshot.val().activeLevel;
    const activeLevelAttempted = snapshot.val().activeLevelAttempted;

    Actions.levels({ type: 'reset'});

    dispatch({
      type: LOGIN_USER_SUCCESS,
      user,
      eggcoin,
      activeLevel,
      activeLevelAttempted
    })
  })
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
