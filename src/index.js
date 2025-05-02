import React from 'react';
import ReactDOM from 'react-dom/client';
// Vuelve a importar SpaceApp
import SpaceApp from './SpaceApp';
// Importa CSS básico
import './styles/App.css';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            {/* Renderiza SpaceApp de nuevo */}
            <SpaceApp />
        </React.StrictMode>
    );
} else {
    console.error("⚠️ Error: No se encontró el elemento root.");
}


