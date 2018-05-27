import React from 'react';
import * as Redux from 'react-redux';
import * as authActions from '../actions/auth-actions.js';
import '../css/landing.css';

import {
  //BrowserRouter as Router,
  //Route,
  Link
} from 'react-router-dom';

// import Login from './LoginForm3.jsx';

// import Background from '../images/mcg5-blur.jpg';

// Convert to React.Component
//export var Login = React.createClass({
export class Login extends React.Component {

  constructor (props) {
    super(props);
    this.onLoginGitHub = this.onLoginGitHub.bind(this);
    this.onLoginEmail = this.onLoginEmail.bind(this);
    // this.register = this.register.bind(this);
  }

  onLoginGitHub () {
    console.log("Begin GitHub login...");
    var {dispatch} = this.props;
    dispatch(authActions.startGitHubLogin());
  }

  onLoginEmail (e) {
    console.log("Begin Email login...");
    e.preventDefault();
    // var emailTxt = this.refs.userid.value;
    // var passwordTxt = this.refs.password.value;
    // console.log("emailTxt:", emailTxt);
    var {dispatch} = this.props;
    dispatch(authActions.startEmailLogin(this.refs.userid.value, this.refs.password.value));
  }

  // register (e) {
  //   console.log("Begin registration...");
  //   e.preventDefault();
  //   var emailTxt = this.refs.userid.value;
  //   var passwordTxt = this.refs.password.value;
  //   var {dispatch} = this.props;
  //   dispatch(authActions.registerUser(emailTxt, passwordTxt));
  // }

  //Same as ...
  //render: function () {}

  render () {

    // const buttonStyle = {
    //   fontFamily:'Ubuntu'
    // };
    // var sectionStyle = {
    //   backgroundImage: 'url(" + { Background } + ")',
    //   background: "#eee",
    //   color: 'blue'
    // };
    //
    var { msg } = this.props;

    return (
      <div className='landing blur'>

        <h1 className='lpHeading'>Login</h1>

        <div className="loginPanel">
          <input className="loginInput" name="" type="email" ref="userid" placeholder="Enter email id..." />
          <input className="loginInput" name="" type="password" ref="password" placeholder="Enter password..." />
          <button className="button2" onClick={this.onLoginEmail}>Login</button>
          <Link className="lpLink" to='/register'>Register</Link>
        </div>
        {/*<p>Login with Github account...</p> */}
        {/*<button className="button" onClick={this.onLoginGitHub}>Login with Github</button> */}
        {/*<p>Login with email account...</p> */}
        {/* }<button className="button" onClick={this.onLoginEmail}>Login with Email</button> */}
        {/* }<p>Register email account...</p> */}
        {/* }<button className="button" onClick={this.register}>Register Email</button> */}
        <p className="error">{msg}</p>

      </div>
    )
  }
};

//export default Login;
export default Redux.connect(
  (state) => {
    return {
      msg: state.msg
    };
    //return state;
  }


)(Login);
