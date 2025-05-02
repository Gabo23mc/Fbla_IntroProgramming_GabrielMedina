import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthApp from './AuthApp';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthApp />
    </React.StrictMode>
  );
}
