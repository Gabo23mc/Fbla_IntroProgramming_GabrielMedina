// src/components/ParkLoaderWrapper.jsx
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function ParkLoaderWrapper({ children, message = "Loading park..." }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900); // Ajusta el tiempo si lo deseas
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner message={message} />}
      {!isLoading && children}
    </>
  );
}
