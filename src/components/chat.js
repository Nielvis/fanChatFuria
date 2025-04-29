import React, { useState, useEffect, useRef } from 'react';
import Message from './message';
import BotInput from './botInput';
import furiaData from '../data/furiaData';
import messagesMock from '../data/mockMessages';


function Chat() {
  const [messages, setMessages] = useState(messagesMock);
  const [waitingForReply, setWaitingForReply] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    let timer;

    if (waitingForReply) {
      timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            from: 'bot',
            text:
              'Parece que você está ocupado! 😅 Aqui está o menu principal novamente, escolha o que deseja fazer:\n\n1️⃣ Ver jogos ao vivo\n2️⃣ Agenda e alertas\n3️⃣ Simulador de Torcida\n4️⃣ Quiz e curiosidades\n5️⃣ Conteúdo exclusivo\n6️⃣ Loja FURIA\n7️⃣ Falar com a FURIA'
          }
        ]);
        setWaitingForReply(false);
      }, 30000);
    }

    return () => clearTimeout(timer);
  }, [waitingForReply]);

  const handleSend = (text) => {
    const userMessage = { from: 'fan', text };
    setMessages((prev) => [...prev, userMessage]);
    setWaitingForReply(false);

    const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    setWaitingForReply(true);

    if (normalizedText.includes('ola')) {
      botReply(
        'Fala, FURIOSO! 🐾\nEu sou o PanteraBOT, seu parceiro na torcida pelo time mais brabo do CS! O que você quer fazer hoje?\n\n1️⃣ Ver jogos ao vivo\n2️⃣ Agenda e alertas\n3️⃣ Simulador de Torcida\n4️⃣ Quiz e curiosidades\n5️⃣ Conteúdo exclusivo\n6️⃣ Loja FURIA\n7️⃣ Falar com a FURIA'
      );
    } else if (normalizedText.includes('1') || normalizedText.includes('ver jogos')) {
      botReply('🔥 Partida rolando agora: FURIA vs NAVI – Placar: 10x8\nQuer ver estatísticas ou melhores momentos? 📊🎥');
    } else if (normalizedText.includes('estatistica')) {
      botReply('Top fraggers:\n🧨 KSCERATO: 22 kills\n🧠 arT: 3 entry kills\n🔒 yuurih: 2 clutches vencidos');
    } else if (normalizedText.includes('2') || normalizedText.includes('agenda')) {
      botReply(`📅 Próximos jogos da FURIA:\n\n🆚 ${furiaData.nextMatch.opponent} – ${furiaData.nextMatch.date} – ${furiaData.nextMatch.time}\n\nÚltimo resultado:\n🆚 ${furiaData.lastResult.opponent} – ${furiaData.lastResult.score}`);
    } else if (normalizedText.includes('3') || normalizedText.includes('torcida')) {
      botReply('Vamos fazer barulho! 🎤\nQual canto você quer mandar pro mural da torcida?\nExemplo:\n“Vai pra cima, FURIA!”\n“É 3K do arT!”');
    } else if (normalizedText.includes('4') || normalizedText.includes('quiz')) {
      botReply('🎮 Quiz Rápido:\nQual foi o ano de fundação da FURIA Esports?\nA) 2015\nB) 2017\nC) 2019');
    } else if (normalizedText === 'a') {
      botReply('Erroooooouuuu!! ❌ A resposta correta é B) 2017.');
    } else if (normalizedText === 'b') {
      botReply('Acertou, miseravi! 🎯 FURIA foi fundada em 2017!');
    } else if (normalizedText === 'c') {
      botReply('Quase lá! ❌ A resposta correta é B) 2017.');
    } else if (normalizedText.includes('5') || normalizedText.includes('conteudo exclusivo')) {
      botReply('🚀 Conteúdo Exclusivo FURIOSO!\n- Bastidores dos treinos\n- Entrevistas com os players\n- Wallpapers oficiais\n\nQuer receber? Me diga: "Quero receber conteúdos exclusivos!"');
    } else if (normalizedText.includes('6') || normalizedText.includes('loja')) {
      botReply('🛒 Loja FURIA Online:\n- Camisas oficiais\n- Bonés exclusivos\n- Itens autografados\n\nAcesse: https://www.furia.gg');
    } else if (normalizedText.includes('7') || normalizedText.includes('falar com a furia')) {
      botReply('📞 Atendimento FURIA:\nEnvie um e-mail para contato@furia.gg ou fale com a gente pelo Instagram @furia.\n\nPosso te ajudar em mais alguma coisa? 😄');
    } else {
      botReply('Não entendi muito bem 🤔, pode tentar de outra forma?');
    }
  };

  const botReply = (text) => {
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text }]);
    }, 500);
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} from={msg.from} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <BotInput onSend={handleSend} />
    </div>
  );
}

export default Chat;
