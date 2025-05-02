import React, { useEffect, useRef } from 'react';

export default function BackgroundMusic({ src = "/assets/audio/music/spacebackground.mp3", volume = 0.5 }) {
  const audioRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.loop = true;
      audio.play().catch(() => {});
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [src, volume]);

  return (
    <audio ref={audioRef} src={src} preload="auto" style={{ display: 'none' }} />
  );
}
