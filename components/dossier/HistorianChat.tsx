
import * as React from 'react';
import type { ChatMessage, LocationFull } from '../../types';
import Modal from '../ui/Modal';
import { askHistorian } from '../../services/geminiService';
import Spinner from '../ui/Spinner';
import { SendIcon, UserIcon } from '../ui/Icons';
import { GhostIcon } from '../ui/Icons';

interface HistorianChatProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationFull;
}

const HistorianChat: React.FC<HistorianChatProps> = ({ isOpen, onClose, location }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const locationContext = `
    Location Name: ${location.name}
    Address: ${location.address}
    Category: ${location.category}
    Tags: ${location.tags.join(', ')}
    Spirit Stories: ${location.dossier.spiritStories}
    Crime & Punishment: ${location.dossier.crimeAndPunishment}
    Social History: ${location.dossier.socialHistory}
  `;

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    
    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await askHistorian(input, locationContext);
    
    const modelMessage: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Ask The Historian: ${location.name}`}>
      <div className="flex flex-col h-[60vh]">
        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-900 flex items-center justify-center"><GhostIcon className="w-5 h-5 text-pink-400"/></div>}
              <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-pink-600/50 text-white' : 'bg-gray-800 text-gray-300'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
               {msg.role === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><UserIcon className="w-5 h-5 text-gray-300"/></div>}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-900 flex items-center justify-center"><GhostIcon className="w-5 h-5 text-pink-400"/></div>
              <div className="max-w-md p-3 rounded-lg bg-gray-800 flex items-center justify-center">
                <Spinner size="sm" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-pink-500/30 pt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about historical facts, crime details..."
            className="flex-grow bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-pink-600 text-white p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-500 transition-colors">
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HistorianChat;