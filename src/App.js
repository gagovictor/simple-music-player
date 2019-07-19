import React, { Component } from 'react';
import './App.css';
import Preloader from './Components/Partials/Preloader';
import MusicPlayer from './Components/Views/MusicPlayer';
import PropTypes from 'prop-types';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initiated : false
    };
    this.refs = {
      musicPlayer: MusicPlayer
    };
  }

  render() {
    return (
      <div className="viktor-music-player">
      	<Preloader
      		initiate = { this.initiate.bind(this) }
      		data = { this.state } />
        <MusicPlayer
        	ref={ref => this.child = ref}
        	data = { this.state } />
      </div>
    );
  }

  initiate() {
  	this.setState({ initiated : true });
  	this.child.initiate();
  }
}

export default App;
