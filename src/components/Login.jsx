import React from 'react';
import * as Redux from 'react-redux';
import * as authActions from '../actions/auth-actions.js';
import { setLocalStorage } from '../api/localStorage.js';
import * as msgActions from '../actions/msg-actions.js';
import '../css/landing.css';
import github_sm from '../images/github-sm.png';
import facebook_sm from '../images/fb-small.png';
import Image from './Image.jsx';

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
    this.onLoginFacebook = this.onLoginFacebook.bind(this);
    this.onLoginGitHub = this.onLoginGitHub.bind(this);
    this.onLoginEmail = this.onLoginEmail.bind(this);
    this.clearMsgTxt = this.clearMsgTxt.bind(this);
    // this.register = this.register.bind(this);
  }

  clearMsgTxt (e) {
    e.preventDefault();
    var {dispatch} = this.props;

    dispatch(msgActions.setMsg(""));
  }

  onLoginGitHub (e) {
    e.preventDefault();
    console.log("Begin GitHub login...");
    setLocalStorage('loginType', 'github');
    var {dispatch} = this.props;
    dispatch(authActions.startGitHubLogin());
  }

  onLoginEmail (e) {
    console.log("Begin Email login...");
    setLocalStorage('loginType', 'email');
    e.preventDefault();
    // var emailTxt = this.refs.userid.value;
    // var passwordTxt = this.refs.password.value;
    // console.log("emailTxt:", emailTxt);
    var {dispatch} = this.props;
    dispatch(authActions.startEmailLogin(this.refs.userid.value, this.refs.password.value));
  }

  onLoginFacebook (e) {
    console.log("Begin Facebook login...");
    setLocalStorage('loginType', 'facebook');
    e.preventDefault();
    // var emailTxt = this.refs.userid.value;
    // var passwordTxt = this.refs.password.value;
    // console.log("emailTxt:", emailTxt);
    var {dispatch} = this.props;
    dispatch(authActions.startFacebookLogin(this.refs.userid.value, this.refs.password.value));
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
   let somePadding = {
     padding: '10px'
   };

    var { msg } = this.props;

    return (
      <div className='landing blur'>

        <div className="loginPanel">
          <h1 className='lpHeading'>Login</h1>
          <input className="loginInput" name="" type="email" ref="userid" placeholder="Enter email id..." onChange={this.clearMsgTxt}/>
          <input className="loginInput" name="" type="password" ref="password" placeholder="Enter password..." onChange={this.clearMsgTxt}/>
          <button className="button2" onClick={this.onLoginEmail}>Login</button>
          <Link className="lpLink" to='/register' style={somePadding}>Register</Link>
          <button className="button3" onClick={this.onLoginGitHub}><Image src={github_sm} height={30} width={30}/><p className='button3_item'>Login with Github</p></button>
          <button className="button3" onClick={this.onLoginFacebook}><Image src={facebook_sm} height={30} width={30}/><p className='button3_item'>Login with Facebook</p></button>
        </div>
        {/*<p>Login with Github account...</p> */}

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
