import React, { Component } from 'react';
import './App.css';
import Preloader from './Components/Partials/Preloader';
import MusicPlayer from './Components/Views/MusicPlayer';
import PropTypes from 'prop-types';

// Redux'ed
import { connect } from "react-redux";
import { songStart } from "./Actions/songStart";
import { songStop } from "./Actions/songStop";
import { songPause } from "./Actions/songPause";
import { songNext } from "./Actions/songNext";
import { songPrev } from "./Actions/songPrev";

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

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  songStart: () => dispatch(songStart),
  songStop: () => dispatch(songStop),
  songPause: () => dispatch(songPause),
  songNext: () => dispatch(songNext),
  songPrev: () => dispatch(songPrev)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
