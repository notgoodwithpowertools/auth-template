import React from 'react';
import * as Redux from 'react-redux';
import * as authActions from '../actions/auth-actions.js';
import * as msgActions from '../actions/msg-actions.js';
import {
  //BrowserRouter as Router,
  //Route,
  Link
} from 'react-router-dom';

import '../css/landing.css';

// Convert to React.Component
//export var Login = React.createClass({
export class Register extends React.Component {

  constructor (props) {
    super(props);
    this.register = this.register.bind(this);
    this.clearMsgTxt = this.clearMsgTxt.bind(this);
  }

  register (e) {
    e.preventDefault();
    var emailTxt = this.refs.userid.value;
    var passwordTxt = this.refs.password.value;
    var firstname = this.refs.firstname.value;
    if (firstname === "") {
      // firstname = emailTxt;
      firstname = emailTxt.split("@")[0];
    }
    var {dispatch} = this.props;
    console.log("Begin registration...");
    dispatch(authActions.registerUser(emailTxt, passwordTxt, firstname));
  }

  clearMsgTxt (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(msgActions.setMsg(""));
  }

  //Same as ...
  //render: function () {}
  render () {

    var { msg } = this.props;

    return (
      <div className='landing blur'>

          <div className="loginPanel">
            <h1 className="lpHeading">Register</h1>
            <input className="loginInput" type="email" ref="userid" placeholder="Enter email id..." onChange={this.clearMsgTxt}/>
            <input className="loginInput" type="password" ref="password" placeholder="Enter password..." onChange={this.clearMsgTxt}/>
            <input className="loginInput" type="text" ref="firstname" placeholder="Enter name..." />
            <button className="button2" onClick={this.register}>Register</button>
            <Link className="lpLink" to='/login'>Back to Login</Link>
          </div>
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

)(Register);
