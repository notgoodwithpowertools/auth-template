import React from 'react';
import * as Redux from 'react-redux';
import { firebaseStorageRef } from '../api/firebase/index.js';
import '../css/userpanel.css';
import PersonImage2 from './PersonImage2.jsx';
import { setUserImgDB } from '../actions/auth-actions.js';

export class User extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    var { user }  = this.props;

    console.log("Event", event);
    var aFile = event.target.files[0];
    console.log("aFile:", aFile);
    var fileExt = aFile.name.split('.').pop()
    console.log("aFile type:", fileExt);
    var userImagesRef = firebaseStorageRef.child('userimages/' + user.firstname + '.' + fileExt);
    var task = userImagesRef.put(aFile);
    task.on('state_changed',
      function progress (snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("%:", percentage);
        console.log("In progress");

      },
      function error () {
        console.log("Error");
      },
      function complete () {
        console.log("Upload complete");
        var downloadURL = task.snapshot.downloadURL;
        console.log("downloadURL:", downloadURL);
        setUserImgDB(user, downloadURL);

      }
    );
  }


  render () {

    var { user }  = this.props;


  return (
    <div className='userpanel'>
      <h3>Email: </h3>
      <p>{user.email}</p>
      <h3>User Name:</h3>
      <p>{user.firstname}</p>
      <h3>Image:</h3>
      <PersonImage2 imageURL={user.imageURL} />
      Change image
      <input type='file' name='img' accept='.gif,.jpg,.jpeg,.png' onChange={ this.handleChange }/>

    </div>
  )
  }

};

export default Redux.connect(
  (state) => {
    return {
      user: state.user
    };
    //return state;
  }

)(User);

// export default User;
