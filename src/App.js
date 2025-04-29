import React from 'react';
import Chat from './components/chat.js';
import './App.css';
import furiaLogo from './assets/Furia_Esports_logo.png';

function App() {
  return (
    <div className="App">
      <div className="app-main">
        <h1>🔥 FURIA FanChat</h1>
        <Chat />
      </div>

      <a
        href="https://api.whatsapp.com/send?l=pt&phone=5511945128297&text=Poderia%20me%20ajudar?"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={furiaLogo} alt="Fale com a FURIA no WhatsApp" />
      </a>
    </div>
  );
}

export default App;
