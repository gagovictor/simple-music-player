import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SeekIcon from '../../Assets/Images/GUI/seek.svg';
import './Controls.css';

class Controls extends Component {

  constructor(props) {
  	super(props);
    this.state = {
      toggledShare : false,
      toggleInfo : false
    };
  }

  render() {
    var data = this.props.data;
    return (
    	<div id="music-player__controls">

	    	<div id="playback" className="row">
	    		<div id="playback_time_current">0:00</div>
	   			<div id="playback_gauge"
               draggable={true}
               onClick={this.seekDuration.bind(this)}
               onDragStart={this.seekDuration.bind(this)}
               onDragEnd={this.seekDuration.bind(this)}>
            <div id="playback_fill"></div>
            <div id="playback_fallback"></div>
	   			</div>
	   			<div id="playback_time_total">4:20</div>
	    	</div>

    		<div id="actions" className={ this.state.toggledShare ? 'inactive' : '' }>
    			<div id="btn_info" onClick={this.toggleInfo}>
          </div>
          <button id="btn_play_pause"
                  onClick={this.props.play == 1 ? this.props.songPause : this.props.songPlay }
                  className={ 'control' + (!this.props.play == 1 ? ' play' : ' pause') }>
            <span className="left"></span>
            <span className="right"></span>
          </button>
    			<div id="btn_share" onClick={this.toggleShare} >
          </div>
    		</div>

    		<div id="actions_secondary" className={ !this.state.toggledShare ? 'inactive' : '' }>
    			<ul id="list_share">
    				<li id="btn_spotify">
    					<a href="http://google.com" target="_blank" rel="noopener noreferrer" alt="Listen on Spotify"></a>
    				</li>
    				<li id="btn_yt">
    					<a href="http://google.com" target="_blank" rel="noopener noreferrer" alt="Watch on YouTube"></a>
    				</li>
    				<li id="btn_ig">
    					<a href="http://google.com" target="_blank" rel="noopener noreferrer" alt="Like on Instagram"></a>
    				</li>
    				<li id="btn_fb">
    					<a href="http://google.com" target="_blank" rel="noopener noreferrer" alt="Share on Facebook"></a>
    				</li>
    				<li id="btn_tt">
    					<a href="http://google.com" target="_blank" rel="noopener noreferrer" alt="Share on Twitter"></a>
    				</li>
    				<li id="btn_itunes">
    					<a href="http://google.com" target="_blank" rel="noopener noreferrer" alt="Buy on iTunes"></a>
    				</li>
    				<li>
    					<div id="btn_share" onClick={this.toggleShare} ></div>
    				</li>
    			</ul>
    		</div>

        <div id="song_info" className={ !this.state.toggleInfo ? 'inactive' : '' } >
        </div>
    	</div>
    );
  }

  toggleInfo = (e) => {
    if(!this.state.toggleInfo)
     this.setState({ toggleInfo : true });
   else
     this.setState({ toggleInfo : false });
  }

  toggleShare = (e) => {
  	//this.props.toggleShare();
  	if(!this.state.toggledShare)
  		this.setState({ toggledShare: true});
  	else
  		this.setState({ toggledShare: false});
  }

  seekDuration = (e) => {
    var pos = (e.clientX-e.target.offsetLeft) / e.target.offsetWidth * 100;
        pos -= 6; // Offset
    this.props.seekDuration(pos);
    if(e.dataTransfer)
    {
      var img = new Image();
      img.src = SeekIcon;
      e.dataTransfer.opacity = 1;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setDragImage(img, 14, 14);
    }
  }

}

Controls.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Controls;
