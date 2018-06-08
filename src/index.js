import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MyApp from './MyApp.jsx';
import registerServiceWorker from './registerServiceWorker';

// import { getLocalStorage, setLocalStorage } from './api/localStorage.js';

import { Provider } from 'react-redux';
import * as authActions from './actions/auth-actions.js';

import firebase from './api/firebase/index.js';

var store = require('./store/configureStore.jsx').configure();

// let loginType = getLocalStorage('loginType');
// console.log("Getting localStorage...logintype:", loginType);
// if (loginType === undefined) {
//
//   loginType = 'email';
//   console.log("Setting default logintype = email in localStorage...");
//   setLocalStorage('loginType', 'email');
// }


// store.dispatch(authActions.setLoginType(loginType));


firebase.auth().onAuthStateChanged( (user) => {
  if (user) {

    store.dispatch(authActions.login(user.uid));

    // startAddUser2 is a change to allow for real time tracking of user changes
    store.dispatch(authActions.startAddUser3(user));

    // if (loginType === 'email') {
    //   // store.dispatch(authActions.monitorUserInfo());
    //   store.dispatch(authActions.startAddUser2(user.uid));
    // }
    // if (loginType === 'github') {
    //   store.dispatch(authActions.getGitHubUserInfo(user));
    // }

    store.dispatch(authActions.monitorRole(user.uid));

  } else {
    store.dispatch(authActions.logout());
  }
});

store.subscribe(() => {
  var state = store.getState();
  //console.log('New state', store.getState());
  console.log('New state', state);
});

ReactDOM.render(
  <div>
    <Provider store={store}>
      <MyApp />
    </Provider>
  </div>
  , document.getElementById('root')
);


// ReactDOM.render(<MyApp />, document.getElementById('root'));
registerServiceWorker();
