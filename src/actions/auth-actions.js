import firebase, { firebaseRef, githubProvider} from '../api/firebase/index.js';
import { setMsg } from './msg-actions';
// export var login = (uid) => {
//   return {
//     type: 'LOGIN',
//     uid: uid
//   };
// };
/*
export var setMsg = (msg) => {
  console.log("setting message:", msg);
  return {
    type: 'SET_MSG',
    msg: msg
  };
};
*/
export var login = (uid) => {
  // console.log("login action...");
  return {
    type: 'LOGIN',
    uid: uid
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var addUser = (user) => {
  return {
    type: 'ADD_USER',
    user: user
  };
};

// export var updateUser = (user) => {
//   return {
//     type: 'UPDATE_USER',
//     user: user
//   };
// };

// export var setUserImg = (url) => {
//   return {
//     type: 'SET_USER_IMG',
//     url: url
//   };
// };

export var setUserImgDB = (user, url) => {
  console.log("setUserImgDB...User ID:", user.uid + " URL:", url);
  firebaseRef.child(`/users/${user.uid}/info/imageURL`).set(url)
  .then(() => {
    firebaseRef.child(`/leaderboard/${user.uid}/imageURL`).set(url)
  });
}


export var startAddUser2 = () => {
  console.log('startAddUser2...');

  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var userRef = firebaseRef.child(`users/${uid}/info`);
    userRef.on('value', snap => {
      // console.log("SNAP:", snap.val());
      dispatch(addUser(snap.val()));

    });
  };
};

// Original startAddUser downloading User info once ... superseded for live update of user data changes (startAddUser2)
// export var startAddUser = () => {
//
//   return (dispatch, getState) => {
//
//     var uid = getState().auth.uid;
//     console.log("startAddUser:", uid);
//     var userRef = firebaseRef.child(`users/${uid}/info`);
//     // console.log("userRef:", userRef.value);
//     userRef.once("value", function(data) {
//       // do some stuff once
//       console.log("User Info Data:", data.val());
//       dispatch(addUser(data.val()));
//     });
//
//   };
// };


export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then( () => {
      console.log("Logged out...");
    });
  };
};

export var startGitHubLogin = () => {
  return (dispatch, getState) => {
    firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log("Auth worked...", result);
    }, (error) => {
      console.log("Unable to auth", error);
    });
  };
};


export var startEmailLogin = (email = "aqwerty543@gmail.com", password = "wally123") => {
  console.log("startEmailLogin...");
  return (dispatch, getState) => {
    //firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    //var testEmail = "aqwerty543@gmail.com";
    console.log("Email for login:", email);
    //var testPassword = "wally123";
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
    //firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log("Auth worked...", result);

      startAddUser2();
    }, (error) => {
      // console.log("Unable to auth", error.message);
      console.log("Auth error:", error);
      dispatch(setMsg(error.message));
      return error.message;

    });
  };
};

// Not used - manually add user to leaderboard
export var addUserToLeaderBoard = (user, firstname, imageURL) => {
  console.log("Adding user to Leaderboard...", user);
  return firebaseRef.child(`leaderboard/${user.uid}/`)
    .set({
      name: firstname,
      imageURL: imageURL
    })
    .then(() => user)
}

export var registerUser = (email, password, firstname) => {
  return (dispatch, getState) => {
    //var testEmail = "aqwerty543@gmail.com";
    //var testPassword = "aqwerty543";
  /*return firebase.auth().createUserWithEmailAndPassword(testEmail, testPassword)
    .then(saveUser)
    .catch((error) => console.log('Oops - Error registering user:', error))*/
    console.log("registerUser:", email + " password:", password + " firstname:", firstname);
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      saveUser(result, firstname);
      console.log("Registration worked...", result);
      // addUserToLeaderBoard(result, firstname);
    }, (error) => {
      console.log("Unable to register", error);
      dispatch(setMsg(error.message));
    });
  };
};

export function saveUser (user, firstname) {
  console.log("Save User:", user);
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);

  // var defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-dev.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=c534d444-e8c5-4738-838e-2b9275090878';
  var defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-prod.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=1737256f-e52d-46de-a754-d64b7168ed96';
  if (process.env.NODE_ENV === 'development') {
    defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-dev.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=c534d444-e8c5-4738-838e-2b9275090878';
  }

  return firebaseRef.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      firstname: firstname,
      imageURL: defURL
    })
    .then(() => {
      addUserToLeaderBoard(user, firstname, defURL)
    })
    .then(() => user)
}


// export function saveUser (user, firstname) {
//   console.log("Save User:", user);
//   return firebaseRef.child(`users/${user.uid}/info`)
//     .set({
//       email: user.email,
//       uid: user.uid,
//       firstname: firstname
//     })
//     .then(firebaseRef.child(`tips/${user.uid}/`).set({
//       uid: user.uid,
//       name: firstname
//     })).then(() => user)
// }

export var setUserAdmin = (admin) => {
  return {
    type: 'SET_USER_ADMIN',
    admin: admin
  };
};

export var monitorRole = (uid) => {
  return (dispatch, getState) => {
    var adminRef = firebaseRef.child(`admins/${uid}`);
    adminRef.on('value', snap => {

      console.log("snap.val() admin value", snap.val());
      var isAdmin = snap.val()
      if (isAdmin) {
        console.log("User has role of Admin");
      }
      else {
        console.log("User is NOT an Admin");
      }
      dispatch(setUserAdmin(isAdmin));
    });
  }
};
