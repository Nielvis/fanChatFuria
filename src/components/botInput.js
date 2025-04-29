import React, { useState } from 'react';

function BotInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="bot-input">
      <input
        type="text"
        placeholder="Fale com o Bot da FURIA..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default BotInput;
