import React from 'react';
import ReactDOM from 'react-dom/client';
import ParkApp from './ParkApp';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ParkApp />
        </React.StrictMode>
    );
} else {
    console.error("⚠️ Error: No se encontró el elemento root en park.html. Asegúrate de que existe un <div id='root'></div>.");
}
