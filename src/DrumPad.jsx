import React, {useEffect, useState} from "react";

const DrumPad = ({ keyTrigger, sound, label, audioContext, buffers, volume  }) => {
    const [isPressed, setIsPressed] = useState(false);
    const playSound = () => {
      if (buffers[sound]) {
        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain(); 
        source.buffer = buffers[sound];
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = volume;
        source.start(0);
      }
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
    };
  
    useEffect(() => {
      const handleKeyPress = (event) => {
        if (event.key.toUpperCase() === keyTrigger) {
          playSound();
        }
      };  
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }, [keyTrigger, buffers, volume]);
  
    return (
      <button 
        onClick={playSound} 
        className={`drum-pad ${isPressed ? "pressed" : ""}`}>
        <h3>{label}</h3>
        <h4>({keyTrigger})</h4>
      </button>
    );
  };

  export default DrumPad