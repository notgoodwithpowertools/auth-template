import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MyApp from './MyApp.jsx';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import * as authActions from './actions/auth-actions.js';

import firebase from './api/firebase/index.js';

var store = require('./store/configureStore.jsx').configure();

firebase.auth().onAuthStateChanged( (user) => {
  if (user) {

    store.dispatch(authActions.login(user.uid));

    // startAddUser2 is a change to allow for real time tracking of user changes
    store.dispatch(authActions.startAddUser2(user.uid));
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
