import React, { useState, useRef, useEffect } from 'react';
import { getGeminiSuggestion } from '../services/geminiService';
import type { MenuItem } from '../types';
import { ChatIcon, XIcon, SparklesIcon, PaperAirplaneIcon } from './Icons';

interface AIAssistantProps {
  menuData: MenuItem[];
}

interface Message {
  sender: 'user' | 'ai' | 'system';
  text: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ menuData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { sender: 'system', text: "Olá! Sou seu Assistente de Cardápio IA. Peça-me recomendações como 'Qual é uma boa opção vegetariana?' ou 'Sugira uma pizza picante.'" }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getGeminiSuggestion(input, menuData);
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI suggestion:', error);
      const errorMessage: Message = { sender: 'system', text: "Desculpe, estou com problemas para me conectar agora. Por favor, tente novamente mais tarde." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-accent to-highlight text-white rounded-full p-4 shadow-2xl transition-transform duration-300 hover:scale-110 z-30"
        aria-label="Abrir Assistente de IA"
      >
        {isOpen ? <XIcon className="h-7 w-7" /> : <ChatIcon className="h-7 w-7" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-auto max-h-[70vh] bg-secondary rounded-xl shadow-2xl border border-border flex flex-col z-30 overflow-hidden">
          <header className="p-4 border-b border-border flex items-center space-x-2">
            <SparklesIcon className="h-6 w-6 text-highlight" />
            <h3 className="font-bold text-text-primary">Assistente de Cardápio IA</h3>
          </header>

          <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'ai' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center"><SparklesIcon className="h-5 w-5 text-white"/></div>}
                <div className={`flex flex-col max-w-[320px] leading-1.5 p-3 rounded-xl ${
                    msg.sender === 'user' ? 'rounded-br-none bg-accent text-white' :
                    msg.sender === 'ai' ? 'rounded-bl-none bg-primary' :
                    'bg-transparent text-center w-full text-sm text-text-secondary italic'
                }`}>
                  <p className="text-sm font-normal">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center"><SparklesIcon className="h-5 w-5 text-white"/></div>
                <div className="flex items-center space-x-1 p-3">
                  <span className="w-2 h-2 bg-text-secondary rounded-full animate-pulse delay-0"></span>
                  <span className="w-2 h-2 bg-text-secondary rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-text-secondary rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-border bg-secondary">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Peça uma sugestão..."
                className="flex-grow bg-primary border-border rounded-lg px-3 py-2 focus:ring-accent focus:border-accent text-sm"
                disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="bg-accent text-white rounded-lg p-2 disabled:bg-border disabled:text-text-secondary">
                <PaperAirplaneIcon className="h-5 w-5"/>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;