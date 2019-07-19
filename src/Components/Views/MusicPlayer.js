import React, { Component } from 'react';
import './MusicPlayer.css';
import MusicWheel from '../Partials/MusicWheel';
import Controls from '../Partials/Controls';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import PropTypes from 'prop-types';

class MusicPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing : this.props.play == 1 ? true : false,
      currentSong : this.props.index,
      initiated : this.props.data.initiated
    };
    this.refs = {
      musicWheel: MusicWheel
    };
  }

  render() {
    return (
      <div id="musicplayer">
        <div id="musicplayer-header">
          <div className="wrapper">
            <Header />
          </div>
        </div>
        <main id="musicplayer-main">
          <MusicWheel
            data = { this.state }
            ref={ref => this.child = ref}
            selectSong = {this.selectSong} />
        </main>
        <div id="musicplayer-footer">
          <div className="wrapper">
            <Controls
              data = { this.state }
              seekDuration = { this.seekDuration }
            />
            <Footer />
          </div>
        </div>
        <div id="musicplayer-bg"></div>
      </div>
    );
  }

  // Seleciona uma música (controlado por MusicWheel)
  selectSong = (song) => {
    // Define a música selecionada
    this.currentSong = song;
    this.props.songStart.bind(this);

    // Reproduz o áudio
    if(this.nowPlaying)
      this.nowPlaying.pause();

    this.nowPlaying = new Audio(this.currentSong.getAttribute('data-audio'));
    this.nowPlaying.play();

    // Monitora o fim da música para passar para a próxima via MusicWheel
    this.nowPlaying.addEventListener('ended', function() {
      //this.child.nextSong();
      this.props.index ++; // TODO: Reiniciar index caso chegue na última música
    }.bind(this), false);
    this.props.songStart();

    // Atualiza a barra de progressão
    // TODO: mover para uma função específica?
    this.interval = setInterval(() => {
      var song = this.nowPlaying;
      if(song.paused)
        return;

      // Calcula a duração e adapta para o formato mm:ss
      // src: https://stackoverflow.com/questions/36981501/convert-audio-second-time-to-minute-and-second-format
      var currentTime = song.currentTime | 0;
      var duration = song.duration | 0;
      var minutes = "0" + Math.floor(duration / 60);
      var seconds = "0" + (duration - minutes * 60);
      var dur = minutes.substr(-2) + ":" + seconds.substr(-2);
      minutes = "0" + Math.floor(currentTime / 60);
      seconds = "0" + (currentTime - minutes * 60);
      var cur = minutes.substr(-2) + ":" + seconds.substr(-2);

      // Atualiza interface
      document.querySelector('#playback_time_total').innerHTML = dur;
      document.querySelector('#playback_time_current').innerHTML = cur;
      document.querySelector('#playback_fill').style.width = ((song.currentTime / song.duration) * 100) + '%';
      return;
    }, 50);

    // Atualiza fundo do app
    document.querySelector('#musicplayer-bg').style['animation'] = 'none';
    document.querySelector('#musicplayer-bg').style['background-image'] = "url('"+song.getAttribute('data-image')+"')";
    setTimeout(function() {
      document.querySelector('#musicplayer-bg').style['animation'] = 'expand 8s ease-in-out 0s infinite alternate forwards running';
    }, 50);

    // Atualiza nome no topo
    document.querySelector('#song-name h1').innerHTML = song.getAttribute('data-name');

    // Atualiza botões de compartilhamento

  }

  // Eventos (controlado por Controls)
  togglePlay = () => {
    if(this.currentSong && this.nowPlaying && !this.nowPlaying.paused)
    {
      this.nowPlaying.pause();
      this.setState({ playing : false });
    }
    else if(this.nowPlaying && this.nowPlaying.paused)
    {
      this.nowPlaying.play();
      this.setState({ playing : true });
    }
  }

  seekDuration = (pos) => {
    if(this.currentSong && this.nowPlaying)
    {
      if(this.nowPlaying.paused)
      {
        this.nowPlaying.play();
        this.setState({ playing : true });
      }
      this.nowPlaying.currentTime = this.nowPlaying.duration * pos / 100;
    }
  }

  initiate = () => {
    this.setState({ initiated : true });
  }

}

MusicPlayer.propTypes = {
  data: PropTypes.object.isRequired
}

export default MusicPlayer;