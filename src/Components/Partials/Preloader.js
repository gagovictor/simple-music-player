import React, { Component } from 'react';
import './Preloader.css';
import Logo from '../../Assets/Images/GUI/logo-viktor.svg';
import PropTypes from 'prop-types';

class Preloader extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loaded  : false,
        started : false,
        initLayout : true
    }
  }

  render() {
    setTimeout(this.animatePreloader, 50);

    window.onload = function() {
        this.animatePreloader();
        this.setState({ loaded : true});
    }.bind(this);

    return (
    	<div id="music-player__preloader" className={ this.state.started ? 'inactive' : '' } >
            <img src={ Logo } alt="viktor" className={ 'logo' + (this.state.initLayout ? '' : ' inactive') } />
            <div>
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="80px" height="60px"
                     viewBox="5 0 80 60">
                    <path id="wave"
                        fill="none"
                        stroke="#262626"
                        stroke-width="4"
                        stroke-linecap="round">
                    </path>
                </svg>
            </div>
            <div id="btn_start"
                    onClick={ this.hidePreloader }
                    className={ this.state.loaded ? 'active' : '' }>
                play
            </div>
    	</div>
    );
  }

  hidePreloader = (e) => {
    this.props.initiate();
    this.setState({ started : true, initLayout: false });
  }

  animatePreloader() {
    var path = document.querySelector('#wave');
    var animation = document.querySelector('#moveTheWave');
    var m = 0.512286623256592433;

    function buildWave(w, h) {

      var a = h / 4;
      var y = h / 2;

      var pathData = [
      'M', w * 0, y + a / 2,
      'c',
      a * m, 0,
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,

      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a,
      's',
      -(1 - a) * m, a,
      a, a,
      's',
      -(1 - a) * m, -a,
      a, -a].
      join(' ');

      if(path)
        path.setAttribute('d', pathData);
    }

    buildWave(90, 60);
  }
}

Preloader.propTypes = {
  data: PropTypes.object.isRequired,
  initiate: PropTypes.func.isRequired
}

export default Preloader;
