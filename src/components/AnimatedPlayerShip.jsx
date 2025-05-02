import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import PlayerShip from './PlayerShip';

const AnimatedPlayerShip = React.forwardRef((props, ref) => {
  const shipRef = useRef();

  useFrame(({ clock }) => {
    if (shipRef.current) {
      const t = clock.getElapsedTime();
      shipRef.current.position.x = Math.sin(t * 0.5) * 6;
      shipRef.current.position.y = Math.cos(t * 0.7) * 2;
      shipRef.current.position.z = -20 + Math.sin(t * 0.3) * 1.5;
      shipRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      shipRef.current.rotation.x = Math.cos(t * 0.7) * 0.1;
    }
  });

  return <PlayerShip ref={ref || shipRef} {...props} />;
});

export default AnimatedPlayerShip;
