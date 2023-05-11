import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import videoFile from './1-example.mp4';

function App() {
  const videoRef = useRef(null);

  const playVideo = () => {
    videoRef.current.play();
  };
  return (
    <div className="App">
      <h1 className="title">Moti Story</h1>
      <div className="button-container">
      <button className="button" onClick={playVideo}>
          Play Video
        </button>
      </div>
      <video
        ref={videoRef}
        className="video"
        src={videoFile}
      />
    </div>
  );
}

export default App;