import React from 'react';
import * as Redux from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  // Switch,
  // Link,
  NavLink
} from 'react-router-dom';

import './css/App.css';
import './css/index.css';

import About from './components/About.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import LandingPage from './components/LandingPage.jsx';
import User from './components/User.jsx';
import Image from './components/Image.jsx';

import './css/nav.css';

// import home_img from './images/home.png';
import logout_img from './images/logout.png';
import user_img from './images/man-24-128-white.png';
import info_img from './images/information.png';

import * as authActions from './actions/auth-actions.js';

export class MyApp extends React.Component {

  constructor() {
    super();
    this.protect = this.protect.bind(this);
  }

  onLogout (e) {
    var {dispatch} = this.props;
    e.preventDefault();
    dispatch(authActions.startLogout());
  }

  protect (aComponent) {
    var {user} = this.props;
    if (user === undefined) {
      return LandingPage;
    }
    else {
      return aComponent;
    }
  }

  render () {

    var activeStyle = {
        // fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#E21E31',
        borderBottomStyle: 'solid',
        borderBottomColor: '#E21E31'
    }

    var { user }  = this.props;
    console.log("user:", user);

    var menu = () => {

      if ( user ) {
        return (

          <div className='nav'>
          <ul className='nav_ul'>
            <li className='nav_li'><NavLink to="/user" activeStyle={activeStyle}><Image src={user_img} height={25} width={25} /><div className='nav_text'>User</div></NavLink></li>
            <li className='nav_li'><NavLink to="/about" activeStyle={activeStyle}><Image src={info_img} height={25} width={25} /><div className='nav_text'>About</div></NavLink></li>
            <li className='nav_li'><NavLink to="#" onClick={this.onLogout.bind(this)}><Image src={logout_img} height={25} width={25} /><div className='nav_text'>Logout</div></NavLink></li>
          </ul>
          </div>
        )
      }
    }

    return (

      <Router>
        <div>
          {menu()}
          <Route exact path="/" render={() => (
              user ?
              <User /> :
              <Redirect to="/start" />
          )}/>
          <Route path="/login" render={() => (
              user ?
              <Redirect to="/user" /> :
              <Login />
          )}/>
          <Route path="/register" render={() => (
              user ?
              <Redirect to="/user" /> :
              <Register />
          )}/>
          <Route path="/start" render={() => (
              user ?
              <Redirect to="/user" /> :
              <LandingPage />
          )}/>
          <Route path="/user" component={this.protect(User)} />
          <Route path="/about" component={About} />
        </div>
      </Router>
      )
    }
};

export default Redux.connect(
  (state) => {
    return {
      user: state.auth.uid
    };
    //return state;
  }

)(MyApp);
// export default MyApp;
