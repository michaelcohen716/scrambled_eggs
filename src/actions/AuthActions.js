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
  CREATE_USER,
  SIGNUP_USER_FAIL,
  LOGOUT
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
      .catch(() => signupUserFail(dispatch));
  }
}

const signupUserFail = (dispatch) => {
  dispatch({
    type: SIGNUP_USER_FAIL
  })
}

const signupUserSuccess = (dispatch, user) => {
    Actions.levels({ type: 'reset'});

    dispatch({
      type: SIGNUP_USER_SUCCESS,
      payload: user
    });
    createUser(dispatch, user);

};

const createUser = (dispatch, user) => {
  dispatch({ type: CREATE_USER })
  const email = user.email;
  const creationTime = user.metadata.creationTime;
  const lastSignInTime = user.metadata.lastSignInTime;

  const { currentUser } = firebase.auth();
  // default user game info
  firebase.database().ref(`/users/${currentUser.uid}`)
    .set({ email, creationTime, lastSignInTime });

  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .set({
      eggcoin: 1000,
      activeLevel: 1,
      activeLevelAttempted: false,
      itemsToggle: {
        seeALetter: false,
        fireUp: false,
        shakeItUp: false,
        unlockAWord: false,
        addTime: false
      }
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
  const lastSignInTime = user.metadata.lastSignInTime;
  firebase.database().ref(`/users/${currentUser.uid}`)
    .update({ lastSignInTime });

  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .once('value', (snapshot) => {

    const eggcoin = snapshot.val().eggcoin;
    const activeLevel = snapshot.val().activeLevel;
    const activeLevelAttempted = snapshot.val().activeLevelAttempted;
    const itemsToggle = snapshot.val().itemsToggle;

    Actions.levels({ type: 'reset'});

    dispatch({
      type: LOGIN_USER_SUCCESS,
      user,
      eggcoin,
      activeLevel,
      activeLevelAttempted,
      itemsToggle
    })
  })
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const logout = () => {
  firebase.auth().signOut();

  return {
    type: LOGOUT
  }
}
