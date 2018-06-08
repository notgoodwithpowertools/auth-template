// http://blog.matthewcheok.com/a-better-img-tag/

import React, {Component} from 'react';

export default class Image extends Component {

  render() {
    // var imageName = require(`../logo.svg`);
    let {mode, src, height, width, style, cssClass, ...props} = this.props;

    let defaults = {
      height: height || 50,
      width: width || 50
      // backgroundColor:
    };

    if (cssClass !== undefined) {
      defaults = { }
    }

    // src = imageName;
    let modes = {
      'fill': 'cover',
      'fit': 'contain'
    };
    let size = modes[mode] || 'contain';



    let important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: size,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    };

    return <div {...props} style={{...defaults, ...style, ...important}} className={cssClass}/>
  }
}
