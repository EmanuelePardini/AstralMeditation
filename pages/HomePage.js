import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startTimer } from '../store/timerSlice';
import { roomData } from '../utils/RoomData';
import '../css/HomePage.css';



const HomePage = () => {
  const [countdown, setcountdown] = useState(5); // Valore iniziale a 5 minuti
  const [selectedRoom, setSelectedRoom] = useState('hanami'); // Valore predefinito
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    dispatch(startTimer(countdown * 60)); // Converti i minuti in secondi
    navigate('/meditation',{ state: { selectedRoom }}); 
  };

  return (
    <div className='home-container'>
       <video className="background-video" autoPlay loop muted>
        <source  src={roomData.home.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1>Astral Meditation</h1>  
      <label htmlFor="countdownInput">How much do you want to meditate?</label>
      <input
        type="number"
        value={countdown}
        onChange={e => setcountdown(parseInt(e.target.value))}
      />
      <label htmlFor="roomSelect">Where would you like to meditate?</label>
       <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
        <option value="hanami">Hanami</option>
        <option value="rain">Rain</option>
        <option value="gargantuablue">Gargantua Blue</option>
        <option value="fairyfalls">Fairy Falls</option>
        <option value="interstellar">Interstellar</option>
      </select>
      <button onClick={handleNavigate}>Start Timer</button>
    </div>
  );
};

export default HomePage;
