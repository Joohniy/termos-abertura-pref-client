import React, { useState, useEffect } from 'react';
import './JumpingImage.css';
import Logo from '../img/brasao_osasco.png';

function JumpingImage(props) {
  return (
    <img
      className="jumping-image"
      src={props.imageSource}
      alt="Jumping img"
      style={{ transform: `translateY(${props.imagePosition}px)` }}
    />
  );
}

function JumpApp() {
  const [imagePosition, setImagePosition] = useState(0);

  useEffect(() => {
    const jumpInterval = setInterval(jump, 1000);

    return () => {
      clearInterval(jumpInterval);
    };
  }, []);

  const jump = () => {
    setImagePosition((prevPosition) => (prevPosition === 0 ? -20 : 0));
  };

  return (
    <div className="centered-container">
      <JumpingImage imageSource={Logo} imagePosition={imagePosition} />
    </div>
  );
}

export default JumpApp;