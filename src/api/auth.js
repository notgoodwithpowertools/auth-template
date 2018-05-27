import firebase, {firebaseRef, githubProvider} from './api/firebase/index.js';

export var startGitHubLogin = () => {
  return (dispatch, getState) => {
    firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log("Auth worked...", result);
    }, (error) => {
      console.log("Unable to auth", error);
    });
  };
};


export var startEmailLogin = (email, password) => {
  return (dispatch, getState) => {
    //firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var testEmail = "aqwerty543@gmail.com";
    var testPassword = "wally123";
    firebase.auth().signInWithEmailAndPassword(testEmail, testPassword).then((result) => {
    //firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log("Auth worked...", result);
    }, (error) => {
      console.log("Unable to auth", error);
    });
  };
};


export var registerUser = (email, password) => {
  return (dispatch, getState) => {
    var testEmail = "aqwerty543@gmail.com";
    var testPassword = "aqwerty543";
  /*return firebase.auth().createUserWithEmailAndPassword(testEmail, testPassword)
    .then(saveUser)
    .catch((error) => console.log('Oops - Error registering user:', error))*/
    firebase.auth().createUserWithEmailAndPassword(testEmail, testPassword).then((result) => {
      saveUser(result);
      console.log("Registration worked...", result);
    }, (error) => {
      console.log("Unable to register", error);
    });
  };
};

export function saveUser (user) {
  console.log("User:", user);
  return firebaseRef.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then( () => {
      console.log("Logged out...");
    });
  };
};
