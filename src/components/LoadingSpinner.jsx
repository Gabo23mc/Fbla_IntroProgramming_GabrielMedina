import React from 'react';
import '../styles/LoadingSpinner.css'; // Asegúrate de que la ruta sea correcta

const LoadingSpinner = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
