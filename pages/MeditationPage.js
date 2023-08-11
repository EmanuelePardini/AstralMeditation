import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { stopTimer, restartTimer, setCountdown, resetTimer } from '../store/timerSlice';
import { roomData } from '../utils/RoomData';
import '../css/MeditationPage.css' 

const MeditationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countdown, running } = useSelector(state => state.timer);
  const location = useLocation();
  const selectedRoom = location.state.selectedRoom;
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const { video, audio } = roomData[selectedRoom];


    let interval;

    if (running && countdown > 0) {
      interval = setInterval(() => {
        dispatch(setCountdown(countdown - 1)); // Decrementa i minuti
      }, 1000); // Ogni 60 secondi (1 minuto)
    } else if (countdown === 0) {
      dispatch(stopTimer());
      videoRef.current.pause();
      audioRef.current.pause();
    }

    return () => clearInterval(interval);
  }, [running, countdown, dispatch]);

  const handleToggle = () => {
    if (running) {
      dispatch(stopTimer());
      videoRef.current.pause();
      audioRef.current.pause();
      
    } else {
      dispatch(restartTimer());
      videoRef.current.play();
      audioRef.current.play();
      
    }
  };
  const handleNavigate = () => {
    navigate('/'); 
  };

  const handleReset = () => {
    dispatch(resetTimer());
    videoRef.current.currentTime = 0;
    audioRef.current.currentTime = 0;
    videoRef.current.play();
    audioRef.current.play();
  };

  return (
       <div className="meditation-container">
      <video ref={videoRef} className="background-video" autoPlay loop muted>
        <source  src={roomData[selectedRoom].video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} className="background-audio" autoPlay loop>
        <source  src={roomData[selectedRoom].audio} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      /* Pulsanti e gestione del timer */
      <div className="content">
        <h1> {Math.floor(countdown / 60)} : {countdown % 60}</h1>
        <button onClick={handleToggle}>{running ? 'Stop' : 'Start'}</button>
        <button onClick={handleReset}>Restart</button>
        <button onClick={handleNavigate}>Back to Home</button>
      </div>
    </div>
);
};

export default MeditationPage;
