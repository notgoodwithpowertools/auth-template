//var redux = require('redux');
import * as redux from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//var {searchTextReducer, showCompletedReducer, todosReducer} = require('../reducers/reducers.jsx');
import { authReducer, userReducer, msgReducer } from '../reducers/reducers.jsx';

export var configure = (initialState={}) => {
  var reducers = redux.combineReducers({
    auth: authReducer,
    user: userReducer,
    msg: msgReducer
  });

  console.log("Window:", window.navigator.userAgent);


  var getComposeEnhancers = () => {
    if (window.navigator.userAgent.includes('Chrome') && (process.env.NODE_ENV === 'development')) {
      return composeWithDevTools(
        redux.applyMiddleware(thunk)
        // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    }
    // else return null;
    return redux.compose(redux.applyMiddleware(thunk) );
  };
  var store = redux.createStore(reducers, initialState, getComposeEnhancers() );

  return store;
};
