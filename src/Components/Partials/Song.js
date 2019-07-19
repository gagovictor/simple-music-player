import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Song.css';

class Song extends Component {

	render() {
		var song = this.props.data;
		return (
			<div className="song"
				 //onClick={this.selectSong.bind(this)}
				 data-id={song.id}
				 data-name={song.name}
				 data-image={song.image_low}
				 data-audio={song.audio}
				 data-link-fb={song.fb_link}
				 data-link-yt={song.yt_link}
				 data-link-ig={song.ig_link}
				 data-link-tt={song.tt_link}
				 data-link-itunes={song.itunes_link}
				 data-link-spotify={song.spotify_link}
				>
				<div className="frame">
				</div>
				<img data-pin-nopin='nopin'
					 srcSet = { song.image_low + ' 270w, ' + song.image_medium + ' 455w, ' + song.image_high + ' 1080w'}
					 alt = { song.name } />
			</div>
		);
	}

	selectSong = (e) => {
		this.props.selectSong(e.target.getAttribute('data-audio'));
	}
}

Song.propTypes = {
  data: PropTypes.object.isRequired,
  selectSong: PropTypes.func.isRequired
}

export default Song;