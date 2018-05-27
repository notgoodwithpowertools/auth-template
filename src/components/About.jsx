import React from 'react';

// import '../css/numbercircle.css';
// import '../css/player.css';
// import '../css/App.css';
import AboutItem from './AboutItem.jsx';

import logo from '../svg/logo.svg';
import React_img from '../images/tech/react.png';
import Gimp_img from '../images/tech/gimp.jpg';
import ReactDev_img from '../images/tech/ReactDevTools.png';
import Redux_img from '../images/tech/redux.png';
import ReactRouter_img from '../images/tech/reactrouter.png';
import Firebase_img from '../images/tech/firebase.png';
import Heroku_img from '../images/tech/heroku.png';
import Github_img from '../images/tech/github.png';
import ES6_img from '../images/tech/es6.png';
import Babel_img from '../images/tech/babel.png';
import Webpack_img from '../images/tech/webpack.svg';
import Express_img from '../images/tech/express.png';
import NPM_img from '../images/tech/npm.png';
import Node_img from '../images/tech/node.png';
import CRA_img from '../images/tech/cra.png';
import JS_img from '../images/tech/js.png';
import CSS3_img from '../images/tech/css3.jpg';
import HTML5_img from '../images/tech/html5.png';
import Atom_img from '../images/tech/atom.jpg';
import Chrome_img from '../images/tech/chrome.jpg';
import Firefox_img from '../images/tech/firefox.jpg';
import Ubuntu_img from '../images/tech/ubuntu.png';
import VMware_img from '../images/tech/vmware.jpg';
import OSX_img from '../images/tech/osx.jpg';
import Mac_img from '../images/tech/mac.png';



const About = () => {

  var items = [
    {image: React_img, text: "React"},
    {image: Gimp_img, text: "The Gimp"},
    {image: ReactDev_img, text: "React Dev Tools"},
    {image: Redux_img, text: "Redux"},
    {image: ReactRouter_img, text: "React Router"},
    {image: Firebase_img, text: "Firebase"},
    {image: Heroku_img, text: "Heroku"},
    {image: Github_img, text: "Github"},
    {image: ES6_img, text: "ES6"},
    {image: Babel_img, text: "Babel"},
    {image: Webpack_img, text: "Webpack"},
    {image: Express_img, text: "Express"},
    {image: NPM_img, text: "NPM"},
    {image: Node_img, text: "Node"},
    {image: CRA_img, text: "Create React App"},
    {image: HTML5_img, text: "HTML5"},
    {image: CSS3_img, text: "CSS"},
    {image: JS_img, text: "Javascript"},
    {image: Atom_img, text: "Atom"},
    {image: Chrome_img, text: "Chrome"},
    {image: Firefox_img, text: "Firefox"},
    {image: Ubuntu_img, text: "Ubuntu"},
    {image: VMware_img, text: "Fusion"},
    {image: OSX_img, text: "OSX"},
    {image: Mac_img, text: "Mac"}

  ];

  var listItems = () => {

    return items.map( (item, index) => {
      // var rank = index + 1;
      // <Player key={player.id} {...player} rank={rank}/>
      return (
        // <p key={player.uid}>{player.firstname} - TotalTips:{player.totalTips}</p>
        <AboutItem key={index} src={item.image} text={item.text} />
      )
    });
  }

  var style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  };

  var headingStyle = {
    textAlign: 'center'
  }

  return (
    <div style={style}>
        <h3 style={headingStyle}>V0.8 Tech used in this project</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <div style={style}>
        {listItems()}
        </div>
   </div>

  );

};

export default About;
