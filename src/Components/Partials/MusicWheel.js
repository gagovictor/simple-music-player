import React, { Component } from 'react';
import 'swiper/dist/css/swiper.min.css';
import './MusicWheel.css';
import SongList from '../../Data/SongList';
import Song from './Song';
import PropTypes from 'prop-types';

class MusicWheel extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	swiper: null
    }
  }

  render() {
	var Swiper = require('swiper');

  	var musicWheel = this;
  	var data = this.props.data;
	var songSelect = this.selectSong;

  	var songs = SongList.map(function(song) {
      if(song.name && (song.image_low || song.image_medium || song.image_high) && song.audio)
      {
    	 return (
          <div className="swiper-slide" key={song.id}>
            <Song
              data = { song }
              selectSong = { musicWheel.selectSong }
              //play = { controls.play }
            />
          </div>
        );
      }
      return null;
  	});

	/* Document Ready Listener
	/**************************/
	var domIsReady;
  	domIsReady = (function(domIsReady) {
	   var isBrowserIeOrNot = function() {
	      return (!document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie');
	   }

	   domIsReady = function(callback) {
	      if(callback && typeof callback === 'function'){
	         if(isBrowserIeOrNot() !== 'ie') {
	            document.addEventListener("DOMContentLoaded", function() {
	               return callback();
	            });
	         } else {
	            document.attachEvent("onreadystatechange", function() {
	               if(document.readyState === "complete") {
	                  return callback();
	               }
	            });
	         }
	      } else {
	         console.error('The callback is not a function!');
	      }
	   }

	   return domIsReady;
	})(domIsReady || {});

	/* Callback document ready
	 * Inicializa o Swiper e monitora seu estado
	 ********************************************/
	(function(document, window, domIsReady/*, undefined*/)
	{
		domIsReady(function()
		{
			/* Inicializa swiper
			/********************/
			var swiper = new Swiper.default('#song-wheel', {
			    autoplay: false,
			    mousewheel: true,
			    effect: 'coverflow',
			    grabCursor: true,
			    centeredSlides: true,
			    nextButton: '.slider-next-button',
			    prevButton: '.slider-prev-button',
			    slidesPerView: 3,
			    spaceBetween: 0,
			    coverflowEffect: {
			      rotate: 45,
			      stretch: 0,
			      depth: 50,
			      modifier: 1,
			      slideShadows: false,
			    },
			    pagination: {
			      el: '.swiper-pagination',
			    },
			    breakpoints: {
			      576: {
			        slidesPerView: 1.25,
			        spaceBetween: -20
			      },
			      960: {
			        slidesPerView: 2,
			        spaceBetween: -20
			      }
			    }
			});

			musicWheel.setState({ swiper: swiper });

			/* Monitora atividade do slider para trocar de música
			/******************************************************/
			musicWheel.state.swiper.on('slideChangeTransitionStart', function ()
			{
				songSelect(document.querySelector(".swiper-slide-active > .song"));
			});

			/* Setas de navegação
			/**********************/
			document.querySelector('.swiper-button-next').addEventListener('click', function(e) {
				musicWheel.state.swiper.slideNext();
			});
			document.querySelector('.swiper-button-prev').addEventListener('click', function(e) {
				musicWheel.state.swiper.slidePrev();
			});

		    /* Setas respondem a qualquer transição,
		    /* mesmo as que não foram provocadas pelo clique
			/*************************************************/
		    musicWheel.state.swiper.on('slideNextTransitionStart', function() {
		      document.querySelector('.swiper-button-next').classList.add('pressed');
		    });
		    musicWheel.state.swiper.on('slideNextTransitionEnd', function() {
		      document.querySelector('.swiper-button-next').classList.remove('pressed');
		    });
		    musicWheel.state.swiper.on('slidePrevTransitionStart', function() {
		      document.querySelector('.swiper-button-prev').classList.add('pressed');
		    });
		    musicWheel.state.swiper.on('slidePrevTransitionEnd', function() {
		      document.querySelector('.swiper-button-prev').classList.remove('pressed');
		    });

			/* Seleciona primeira música automaticamente.
			/**********************************************/
			var initMonitor = setInterval(function() {
				if(musicWheel.props.data.initiated)
				{
					songSelect(document.querySelector(".swiper-slide-active > .song"));
					clearInterval(initMonitor);
				}
			}.bind(this), 500);
		}.bind(this));
	}.bind(MusicWheel))(document, window, domIsReady);



	/* Markup
	 **********/
    return (
    	<div id="music-player__wheel">
    		<div className="swiper-container" id="song-wheel">
    			<div className="swiper-wrapper">
    				{songs}
    			</div>
			    <div className="swiper-button-prev"></div>
			    <div className="swiper-button-next"></div>
    		</div>
    	</div>
    );
  }

   /* Toca a música selecionada em Music Wheel
	*******************************************/
	selectSong = (song) => {
		this.props.selectSong(song);
	}

   /* Ativa a transição para a próxima música
	*******************************************/
	nextSong() {
		if(this.state.swiper)
			this.state.swiper.slideNext();
	}
}

MusicWheel.propTypes = {
  data: PropTypes.object.isRequired,
  selectSong: PropTypes.func.isRequired
}

export default MusicWheel;
