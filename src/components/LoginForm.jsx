// import React, { Component } from 'react';
import React from 'react';
import { Form, Field } from 'formik';
// import Yup from 'yup';
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

const LoginForm = ({
  values,
  errors,
  touched,
  isSubmitting
}) => {
let errorStyle = {
  color: 'red'
}
return (
  <Form>

    <p>LoginForm Hello Andrew</p>
    <Field type='email' name='email' placeholder='EMail'/>
    <Field type='password' name='password' placeholder='Password' />
    <label>Receive newsletter</label>
    <Field type='checkbox' name='newsletter' checked={values.newsletter} />
    <Field component='select' name='plan'>
     <option value='free'>Free</option>
     <option value='premium'>Premium</option>
    </Field>

    <button disabled={isSubmitting}>Submit</button>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>
      <div style={errorStyle}>
        {errors.password && <p>{errors.password}</p>}
      </div>
  </Form>
)
}

export default LoginForm;
