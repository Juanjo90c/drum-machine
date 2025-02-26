import React, {useEffect, useState} from "react";
import DrumPad from "./DrumPad";

const drumPads = [
  { key: "Q", sound: "kick.mp3", label: "Kick" },
  { key: "W", sound: "snare.mp3", label: "Snare" },
  { key: "E", sound: "hihatopen.mp3", label: "Hi-Hat Op" },
  { key: "A", sound: "hihatclosed.mp3", label: "Hi-Hat Cl" },
  { key: "S", sound: "clap.mp3", label: "Clap" },
  { key: "D", sound: "stick.mp3", label: "Stick" }
];

const DrumMachine = () => {
  const [volume, setVolume] = useState(0.5);
  const [audioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());
  const [buffers, setBuffers] = useState({});

  useEffect(() => {
    const loadSounds = async () => {
      const newBuffers = {};
      for (let pad of drumPads) {
        try {
          const response = await fetch(`/${pad.sound}`);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          newBuffers[pad.sound] = audioBuffer;
        } catch (error) {
          console.error("Error loading sound:", pad.sound, error);
        }
      }
      setBuffers(newBuffers);
    };
    loadSounds();
  }, [audioContext]);

  return (
  <div className="drum-container">
    <p>DRUM MACHINE</p>
    <div className="drum-machine">
      {drumPads.map(({ key, sound, label }) => (
        <DrumPad key={key} keyTrigger={key} sound={sound} label={label} audioContext={audioContext} buffers={buffers} volume={volume}/>
      ))}
    </div>
      <div className="volume-control">
        <p>Volume</p>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}/>
      </div>
   </div>
  );
};

export default DrumMachine;
