import firebase, { firebaseRef, githubProvider, facebookProvider} from '../api/firebase/index.js';
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

var defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-prod.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=1737256f-e52d-46de-a754-d64b7168ed96';
if (process.env.NODE_ENV === 'development') {
  defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-dev.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=c534d444-e8c5-4738-838e-2b9275090878';
};

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

export var setLoginType = (loginType) => {
  return {
    type: 'SET_LOGIN_TYPE',
    loginType: loginType
  }
};

export var setUserImgDB = (user, url) => {
  console.log("setUserImgDB...User ID:", user.uid + " URL:", url);
  firebaseRef.child(`/users/${user.uid}/info/imageURL`).set(url)
  .then(() => {
    firebaseRef.child(`/leaderboard/${user.uid}/imageURL`).set(url)
  });
}


// export var startAddUser2 = () => {
//   console.log('startAddUser2...');
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//     var userRef = firebaseRef.child(`users/${uid}/info`);
//     console.log("userRef:", userRef);
//     userRef.on('value', snap => {
//       console.log("SNAP:", snap.val());
//       dispatch(addUser(snap.val()));
//
//     });
//   };
// };


export var startAddUser3 = (user) => {
  console.log('startAddUser3...');
  console.log('User:', user);
  return (dispatch, getState) => {
    console.log("loginType:", localStorage.getItem('loginType'));
    var uid = getState().auth.uid;
    var userUidRef = firebaseRef.child(`users/${uid}`);

    if (localStorage.getItem('loginType') === 'email') {
      console.log("Setting up email user info...");
      var userRef = firebaseRef.child(`users/${uid}/info`);
      console.log("userRef:", userRef);
      userRef.on('value', snap => {
        console.log("SNAP:", snap.val());
        dispatch(addUser(snap.val()));

      });
    }
    if (localStorage.getItem('loginType') === 'github') {
      console.log("Setting up Github user info...");
      // console.log("Checking User rego ... ", checkUserRegistration(uid));
      // var userUidRef = firebaseRef.child(`users/${uid}`);
      // var check = false;
      let aUser = {};
      aUser.uid = user.uid;
      aUser.firstname = (user.displayName === null) ? user.uid.substr(0, 8) : user.displayName;
      aUser.email = (user.providerData[0].email === null) ? 'Not provided' : user.providerData[0].email;
      aUser.imageURL = (user.photoURL === null) ? defURL : user.photoURL;
      // console.log("aUser:", aUser);
      dispatch(addUser(aUser));
      userUidRef.once('value', function(snapshot) {
        // The callback succeeded; do something with the final result.
        if (!snapshot.exists()) {
          // check = true;
          console.log("User is NOT registered. Creating user in DB..");
          // console.log("SNAPSHOT:",  snapshot);
          saveUser(aUser, aUser.firstname);

        }
        // else {
        //   check = false;
        //   console.log("User is NOT registered...");
        //
        // }
        //
      }, function(error) {
        // The callback failed.
        console.log(error);
      });

    } //end -- if (localStorage.getItem('loginType') === 'github') {

    if (localStorage.getItem('loginType') === 'facebook') {
      console.log("Setting up Facebook user info...");
      // console.log("Checking User rego ... ", checkUserRegistration(uid));
      // var userUidRef = firebaseRef.child(`users/${uid}`);
      // var check = false;
      let aUser = {};
      aUser.uid = user.uid;
      aUser.firstname = (user.displayName === null) ? user.uid.substr(0, 8) : user.displayName;
      aUser.email = (user.providerData[0].email === null) ? 'Not provided' : user.providerData[0].email;
      aUser.imageURL = (user.photoURL === null) ? defURL : user.photoURL;
      // console.log("aUser:", aUser);
      dispatch(addUser(aUser));
      userUidRef.once('value', function(snapshot) {
        // The callback succeeded; do something with the final result.
        if (!snapshot.exists()) {
          // check = true;
          console.log("User is NOT registered. Creating user in DB..");
          // console.log("SNAPSHOT:",  snapshot);
          saveUser(aUser, aUser.firstname);
        }
        // else {
        //   check = false;
        //   console.log("User is NOT registered...");
        //
        // }
        //
      }, function(error) {
        // The callback failed.
        console.log(error);
      });

    } //end -- if (localStorage.getItem('loginType') === 'facebook') {

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

export var startFacebookLogin = () => {
  return (dispatch, getState) => {
    firebase.auth().signInWithPopup(facebookProvider).then((result) => {
    // firebase.auth().signInWithRedirect(facebookProvider).then((result) => {
      console.log("Facebook Auth worked...", result);
      // getGitHubUserInfo(result.user);
      dispatch(setMsg("Authorised with Facebook..."))
      // setTimeout(() => {
      //   dispatch(setMsg("Authorised with Facebook..."))
      // }, 3000)
    }, (error) => {
      console.log("Unable to authorise with Facebook", error);
      dispatch(setMsg(error.message))
    });
  };
};

export var startGitHubLogin = () => {
  return (dispatch, getState) => {
    // firebase.auth().signInWithPopup(githubProvider).then((result) => {
    firebase.auth().signInWithRedirect(githubProvider).then((result) => {
      console.log("Auth worked...", result);
      // getGitHubUserInfo(result.user);

      setTimeout(() => {
        dispatch(setMsg("Authorised with Github..."))
      }, 3000)
    }, (error) => {
      console.log("Unable to auth", error);
      dispatch(setMsg(error.message))
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

      // startAddUser2(result.uid);
      // startAddUser3();
    }, (error) => {
      // console.log("Unable to auth", error.message);
      console.log("Auth error:", error);
      dispatch(setMsg(error.message));
      return error.message;

    });
  };
};

/*
export var checkUserRegistration = (uid) => {
  console.log("checkUserRegistration: Checking user registration...");
  // firebaseRef.child(`users/${user.uid}`
  var userRef = firebaseRef.child(`users/${uid}`);
  // userRef.once('value', function(snapshot) {
  //   if (snapshot.hasChild(uid)) {
  //     console.log('User is defined');
  //     return true;
  //   }
  //   else {
  //     console.log('User is NOT already defined');
  //     return true;
  //   }
  // });
  // var check;
  return userRef.once("value").then((snapshot) => {
    return snapshot.exists();
    // console.log("Check:", check);
    // return exists;
  });
}
*/

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
  // var defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-prod.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=1737256f-e52d-46de-a754-d64b7168ed96';
  // if (process.env.NODE_ENV === 'development') {
  //   defURL = 'https://firebasestorage.googleapis.com/v0/b/footytips-dev.appspot.com/o/userimages%2Fdefault.jpg?alt=media&token=c534d444-e8c5-4738-838e-2b9275090878';
  // }

  return firebaseRef.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      firstname: firstname,
      imageURL: defURL
    })
    .then(() => {
      // Functions after registration
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

// export var monitorUserInfo = () => {
//   console.log('monitorUserInfo...');
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//     // var user = getState().user;
//     var userRef = firebaseRef.child(`users/${uid}/info`);
//     // if (user !== null) {
//       userRef.on('value', snap => {
//         console.log("SNAP:", snap.val());
//         dispatch(addUser(snap.val()));
//       });
//     // };
//   };
// };



export var getGitHubUserInfo = (aUser) => {

  console.log('getGitHubUserInfo... using aUser:', aUser);


  return (dispatch, getState) => {

    console.log('getGitHubUserInfo... using aUser:', aUser);
    var user = aUser;
    console.log('getGitHubUsgdsdgdsgdshshsdsdderInfo... using user:', user);
    user.firstname = user.displayName;
    user.imageURL = user.photoURL;
    if (user.displayName === null) {
      user.firstname = user.email;
    };

    console.log("User info from GitHub - id:", user.uid +", Email:", user.email + ", Name:", user.displayName + " PhotoURL:,", user.photoURL);

    dispatch(addUser(user));
  };
};
