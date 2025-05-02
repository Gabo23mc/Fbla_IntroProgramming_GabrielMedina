import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const ASTEROID_COUNT = 12; // Un poco más de asteroides

function generateNonOverlappingPositions(count, minDist, xRange, yRange, zRange) {
  const positions = [];
  let attempts = 0;
  while (positions.length < count && attempts < count * 30) {
    const pos = [
      Math.random() * (xRange[1] - xRange[0]) + xRange[0],
      Math.random() * (yRange[1] - yRange[0]) + yRange[0],
      Math.random() * (zRange[1] - zRange[0]) + zRange[0]
    ];
    if (positions.every(p =>
      Math.hypot(p[0] - pos[0], p[1] - pos[1], p[2] - pos[2]) > minDist
    )) {
      positions.push(pos);
    }
    attempts++;
  }
  return positions;
}

export default function AsteroidField() {
  const { scene } = useGLTF('/assets/models/space/asteroid_lowpoly.glb');
  const xRange = [-40, 40];
  const yRange = [-15, 15];
  const zRange = [-80, -10];
  const minDist = 8; // Mantén buena separación

  const positions = React.useMemo(
    () => generateNonOverlappingPositions(ASTEROID_COUNT, minDist, xRange, yRange, zRange),
    []
  );

  const asteroids = React.useMemo(() =>
    positions.map(pos => ({
      ref: React.createRef(),
      position: pos,
      rotSpeed: (Math.random() - 0.5) * 0.01 + 0.003,
      moveSpeed: (Math.random() - 0.5) * 0.01 + 0.008,
      scale: Math.random() * 0.12 + 0.10 // Un poco más grandes (0.10 a 0.22)
    }))
  , [positions]);

  useFrame(() => {
    asteroids.forEach(({ ref, rotSpeed, moveSpeed }, i) => {
      if (ref.current) {
        ref.current.rotation.y += rotSpeed;
        ref.current.rotation.x += rotSpeed * 0.7;
        ref.current.position.z += moveSpeed;
        if (ref.current.position.z > 10) {
          ref.current.position.z = Math.random() * (zRange[1] - zRange[0]) + zRange[0];
          let newPos;
          let tries = 0;
          do {
            newPos = [
              Math.random() * (xRange[1] - xRange[0]) + xRange[0],
              Math.random() * (yRange[1] - yRange[0]) + yRange[0]
            ];
            tries++;
          } while (
            asteroids.some((a, j) =>
              j !== i &&
              a.ref.current &&
              Math.hypot(
                a.ref.current.position.x - newPos[0],
                a.ref.current.position.y - newPos[1]
              ) < minDist
            ) && tries < 20
          );
          ref.current.position.x = newPos[0];
          ref.current.position.y = newPos[1];
        }
      }
    });
  });

  return (
    <>
      {asteroids.map((asteroid, i) => (
        <primitive
          key={i}
          ref={asteroid.ref}
          object={scene.clone()}
          position={asteroid.position}
          scale={[asteroid.scale, asteroid.scale, asteroid.scale]}
        />
      ))}
    </>
  );
}
