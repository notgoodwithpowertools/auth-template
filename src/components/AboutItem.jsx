import React from 'react';
import Image from './Image.jsx';

const AboutItem = (props) => {

  var { src, text } = props;

  var style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px'

  };

  var textStyle = {
    margin: '5px',
    marginRight: '15px',

    // paddingRight: '15px'
  }



  return (
    <div style={style}>
      <Image src={src} />
      <p style={textStyle}>{text}</p>
    </div>
  );

};

export default AboutItem;
