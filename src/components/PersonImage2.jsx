import React from 'react';
// import '../css/player.css';
// import { firebaseStorageRef } from '../api/firebase/index.js';

const PersonImage2 = ({imageURL}) => {

  console.log("PersonImage2 imageName:", imageURL);

  var picStyle = {
    height: '70px',
    width: '70px'
  }

  // var altImage = require(`../images/ryan.png`)

  return (
    <div>
      <img style={picStyle} src={imageURL} alt='...loading' />
    </div>
  );

};

export default PersonImage2;
