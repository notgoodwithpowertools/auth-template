// import React, { Component } from 'react';
// import React from 'react';
import { withFormik } from 'formik';
import LoginForm from './LoginForm.jsx';
import * as Yup from 'yup';

// export class LoginForm extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

//   render () {
//     return (<p>LoginForm Hello Andrew</p>)
//   }
// }
//
// export default LoginForm;

const FormikApp = withFormik({
  mapPropsToValues({email, password, newsletter, plan}) {
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || true,
      plan: plan || 'premium'
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    // password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required')
    password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password is required')
  }),
  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
    console.log("Values:", values);
    setTimeout( () => {
      if (values.email === 'andrew.assauw@icloud.com') {
        setErrors({email:'That email is taken'});
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000)
  }
})(LoginForm);

export default FormikApp;
