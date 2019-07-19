import React, { Component } from 'react';
import './Header.css';
import Logo from '../../Assets/Images/GUI/logo-viktor.svg';

class Header extends Component {
  render() {
    return (
    	<header id="music-player__header">
    		<div className="container">
                <div className="follow-quick">
                    <iframe
                        title="spotify-follow"
                        id="spotify-follow"
                        src="https://open.spotify.com/follow/1/?uri=spotify:artist:4F0PsRWaPnFQDvig0aYETi?si=Wn61jumqTESMhaYGjn9YcQ&size=detail&theme=light&show-count=0"
                        width="300" height="56"
                        scrolling="no" frameBorder="0"
                        allowtransparency="true">
                    </iframe>
                </div>
    			<div className="main">
                    <div className="logo-viktor">
        				<img src={Logo} alt="viktor" />
        			</div>
                    <div id="song-name">
        			 <h1> </h1>
                    </div>
                </div>
    		</div>
    	</header>
    );
  }
}

export default Header;
