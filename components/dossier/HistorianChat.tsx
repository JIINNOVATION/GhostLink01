
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, LocationFull } from '../../types';
import Modal from '../ui/Modal';
import { askHistorian, generateSpeech } from '../../services/geminiService';
import Spinner from '../ui/Spinner';
import { SendIcon, UserIcon, GhostIcon, AlienIcon, MicrophoneIcon, PlayIcon, StopIcon } from '../ui/Icons';
import { LocationCategory } from '../../types';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { decode, decodeAudioData } from '../../utils/audioUtils';

interface HistorianChatProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationFull;
}

const HistorianChat: React.FC<HistorianChatProps> = ({ isOpen, onClose, location }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [audioState, setAudioState] = useState<'idle' | 'generating' | 'playing'>('idle');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
        setInput(transcript);
    }
  }, [transcript]);

  const isAlienTheme = [LocationCategory.ALIEN, LocationCategory.CRYPTID, LocationCategory.VORTEX].includes(location.category);
  const ModelIcon = isAlienTheme ? AlienIcon : GhostIcon;

  const locationContext = `
    Location Name: ${location.name}
    Address: ${location.address}
    Category: ${location.category}
    Tags: ${location.tags.join(', ')}
    ${location.dossier.map(section => `${section.title}: ${section.content}`).join('\n')}
  `;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const stopAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.onended = null;
      audioSourceRef.current.stop();
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
    }
    setAudioState('idle');
    setCurrentlyPlaying(null);
  };
  
  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      if(isListening) stopListening();
    }
  }, [isOpen, isListening, stopListening]);
  
  const playAudio = async (text: string, messageId: string) => {
    if (audioState === 'playing' && currentlyPlaying === messageId) {
        stopAudio();
        return;
    }
    stopAudio();
    setAudioState('generating');
    setCurrentlyPlaying(messageId);

    // This is required for mobile browsers to allow audio playback.
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }

    const base64Audio = await generateSpeech(text);
    if (!base64Audio) {
      setAudioState('idle'); setCurrentlyPlaying(null);
      return;
    }
    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const audioContext = audioContextRef.current;
      const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      source.onended = () => { if (audioSourceRef.current === source) stopAudio(); };
      audioSourceRef.current = source;
      setAudioState('playing');
    } catch (error) {
      console.error("Error playing audio:", error);
      stopAudio();
    }
  };
  
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    
    if (isListening) stopListening();
    stopAudio();
    
    // Create audio context on user interaction for mobile compatibility
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    
    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await askHistorian(input, locationContext, location.name);
    
    const modelMessage: ChatMessage = { role: 'model', text: response.text, citations: response.citations };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
    
    playAudio(response.text, `msg-${messages.length + 1}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (isListening) stopListening(); else startListening();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Ask The Historian: ${location.name}`}>
      <div className="flex flex-col h-[60vh]">
        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {messages.map((msg, index) => {
            const messageId = `msg-${index}`;
            return (
              <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary/20 flex items-center justify-center"><ModelIcon className="w-5 h-5 text-theme-primary"/></div>}
                <div className={`max-w-md rounded-lg relative group ${msg.role === 'user' ? 'bg-theme-primary/50 text-white' : 'bg-gray-800 text-gray-300'}`}>
                  <div className="p-3">
                    <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></p>
                  </div>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2 border-t border-theme-primary/20 p-3">
                        <h4 className="text-xs font-bold text-gray-400 mb-1">Sources:</h4>
                        <ul className="text-xs space-y-1">
                            {msg.citations.map((citation, i) => (
                                <li key={i} className="truncate"><a href={citation.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline" title={citation.title}>{citation.title}</a></li>
                            ))}
                        </ul>
                    </div>
                  )}
                  {msg.role === 'model' && msg.text && (
                     <button onClick={() => playAudio(msg.text, messageId)} className="absolute -bottom-3 -right-3 bg-gray-700 p-1.5 rounded-full text-theme-primary hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" title={audioState === 'playing' && currentlyPlaying === messageId ? 'Stop' : 'Play'}>
                       {(audioState === 'generating' && currentlyPlaying === messageId) ? <Spinner size="sm" /> : (audioState === 'playing' && currentlyPlaying === messageId) ? <StopIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                     </button>
                  )}
                </div>
                {msg.role === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><UserIcon className="w-5 h-5 text-gray-300"/></div>}
              </div>
            )
          })}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary/20 flex items-center justify-center"><ModelIcon className="w-5 h-5 text-theme-primary"/></div>
              <div className="max-w-md p-3 rounded-lg bg-gray-800 flex items-center justify-center"><Spinner size="sm" /></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-theme-primary/30 pt-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? "Listening..." : "Ask about historical facts, sightings..."}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all"
              disabled={isLoading}
            />
            {isSupported && (
              <button onClick={handleMicClick} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-theme-primary transition-colors" title={isListening ? "Stop listening" : "Start listening"}>
                <MicrophoneIcon className={`w-5 h-5 ${isListening ? 'text-theme-primary animate-pulse' : ''}`} style={isListening ? {filter: 'drop-shadow(0 0 4px var(--theme-primary))'} : {}} />
              </button>
            )}
          </div>
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-theme-primary/80 text-white p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-theme-primary transition-colors">
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HistorianChat;
