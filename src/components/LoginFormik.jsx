// Render Prop
import React from 'react';
import { Formik } from 'formik';
import * as authActions from '../actions/auth-actions.js';
import { connect } from 'react-redux';
import {
  //BrowserRouter as Router,
  //Route,
  Link
} from 'react-router-dom';
import '../css/landing.css';

const Login = (props) => {
  const { dispatch, msg } = props;
  return (
  <div className='landing blur'>
    {/*
      The benefit of the render prop approach is that you have full access to React's
      state, props, and composition model. Thus there is no need to map outer props
      to values...you can just set the initial values, and if they depend on props / state
      then--boom--you can directly access to props / state.

      The render prop accepts your inner form component, which you can define separately or inline
      totally up to you:
      - `<Formik render={props => <form>...</form>}>`
      - `<Formik component={InnerForm}>`
      - `<Formik>{props => <form>...</form>}</Formik>` (identical to as render, just written differently)
    */}
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(
        values,
        // handleSubmit,
        { setSubmitting, setErrors /* setValues and other goodies */ }
      ) => {
          // dispatch(authActions.startEmailLogin(this.refs.userid.value, this.refs.password.value));
        // authActions.startEmailLogin(values.email, values.password);
        // handleSubmit();
        // LoginToMyApp(values).then(
        //   user => {
        //     setSubmitting(false);
        //     // do whatevs...
        //     // props.updateUser(user)
        //   },
        //   errors => {
            // setSubmitting(false);
        //     // Maybe transform your API's errors into the same shape as Formik's
        //     // setErrors(transformMyApiErrors(errors));
        //   }
        // );
        console.log("Submitted banana:", values.email + ' ' + values.password);
        dispatch(authActions.startEmailLogin(values.email, values.password))
        // let success = true;
        // let tryLogin = new Promise(
        //   (resolve, reject) => {
        //     if (success) {
        //       resolve
        //     }
        //   }
        //
        // );

        // .then(
        //   console.log("Submitting login..."),
        //   errors => {
        //     console.log("Errors", errors);
        //   }
        // );

        // console.log("Msg:", msg);
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div>

        <form onSubmit={handleSubmit} className="loginPanel">
          <h1>Sign In</h1>
          <input
            className="loginInput"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Enter email id..."
          />
        {touched.email && errors.email && <div><p>{errors.email}</p></div>}
          <input
            className="loginInput"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Enter password..."
          />
          {touched.password && errors.password && <div>{errors.password}</div>}
          <button
            className="button2"
            type="submit"
            disabled={isSubmitting}>
            Sign in
          </button>
          <Link className="lpLink" to='/register'>Sign up...</Link>
      </form>

        </div>

      )}
    />
  {<div><p>{msg}</p></div>}
  </div>
)};

// export default LoginForm3;
export default connect(
  (state) => {
    return {
      msg: state.msg
    };
    //return state;
  }



)(Login);
