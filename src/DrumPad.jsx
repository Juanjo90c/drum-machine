import React, { useEffect, useRef } from "react";

const DrumPad = ({ keyTrigger, sound, label, volume }) => {
  const audioRef = useRef(null);
  const padRef = useRef(null);
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    requestAnimationFrame(() => {
      padRef.current.classList.add("pressed");
      setTimeout(() => padRef.current.classList.remove("pressed"), 100);
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === `Key${keyTrigger}`) {
        playSound();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyTrigger, volume]);

  return (
    <button ref={padRef} onClick={playSound} className="drum-pad">
      <h3>{label}</h3>
      <h4>({keyTrigger})</h4>
      <audio ref={audioRef} src={`/${sound}`} preload="auto" />
    </button>
  );
};

export default DrumPad;
