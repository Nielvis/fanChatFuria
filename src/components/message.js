import React from 'react';

function Message({ from, text }) {
  return (
    <div className={`message ${from === 'bot' ? 'bot' : 'fan'}`}>
      {text.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}

export default Message;
