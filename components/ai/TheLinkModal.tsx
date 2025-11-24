import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, LocationFull } from '../../types';
import Modal from '../ui/Modal';
import { askTheLink, generateSpeech } from '../../services/geminiService';
import { decode, decodeAudioData } from '../../utils/audioUtils';
import Spinner from '../ui/Spinner';
import { SendIcon, UserIcon, BrainCircuitIcon, PlayIcon, StopIcon, MicrophoneIcon } from '../ui/Icons';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

interface TheLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  allLocations: LocationFull[];
}

const TheLinkModal: React.FC<TheLinkModalProps> = ({ isOpen, onClose, allLocations }) => {
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

  const allLocationsContext = allLocations.map(location => `
    ---
    Location Name: ${location.name}
    Category: ${location.category}
    Dossier:
    ${location.dossier.map(section => `${section.title}: ${section.content}`).join('\n    ')}
    ---
  `).join('\n');

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
  
  // Cleanup on close
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

    const base64Audio = await generateSpeech(text);
    if (!base64Audio) {
      setAudioState('idle');
      setCurrentlyPlaying(null);
      console.error("Failed to generate audio.");
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
      source.onended = () => {
        if (audioSourceRef.current === source) {
          stopAudio();
        }
      };
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
    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await askTheLink(input, allLocationsContext);
    
    const modelMessage: ChatMessage = { role: 'model', text: response.text, citations: response.citations };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
    
    // Automatically play the response
    playAudio(response.text, `msg-${messages.length + 1}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="The Link: Ultimate AI Guide">
      <div className="flex flex-col h-[60vh]">
        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {/* Initial message */}
          {messages.length === 0 && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary/20 flex items-center justify-center"><BrainCircuitIcon className="w-5 h-5 text-theme-primary"/></div>
              <div className="max-w-md p-3 rounded-lg bg-gray-800 text-gray-300">
                <p>I am The Link, the central intelligence for this operation. I can access all internal case files and search the web for real-time information. Ask me anything about a specific location, a paranormal concept, or practical questions for your investigation. How can I assist?</p>
              </div>
            </div>
          )}

          {messages.map((msg, index) => {
            const messageId = `msg-${index}`;
            return (
              <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary/20 flex items-center justify-center"><BrainCircuitIcon className="w-5 h-5 text-theme-primary"/></div>}
                <div className={`max-w-md rounded-lg relative group ${msg.role === 'user' ? 'bg-theme-primary/50 text-white' : 'bg-gray-800 text-gray-300'}`}>
                  <div className="p-3">
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2 border-t border-theme-primary/20 p-3">
                        <h4 className="text-xs font-bold text-gray-400 mb-1">Sources:</h4>
                        <ul className="text-xs space-y-1">
                            {msg.citations.map((citation, i) => (
                                <li key={i} className="truncate">
                                    <a href={citation.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline" title={citation.title}>
                                        {citation.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                  )}
                   {msg.role === 'model' && msg.text && (
                     <button 
                        onClick={() => playAudio(msg.text, messageId)} 
                        className="absolute -bottom-3 -right-3 bg-gray-700 p-1.5 rounded-full text-theme-primary hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title={audioState === 'playing' && currentlyPlaying === messageId ? 'Stop' : 'Play'}
                     >
                       {(audioState === 'generating' && currentlyPlaying === messageId) 
                         ? <Spinner size="sm" />
                         : (audioState === 'playing' && currentlyPlaying === messageId) 
                           ? <StopIcon className="w-4 h-4" />
                           : <PlayIcon className="w-4 h-4" />
                       }
                     </button>
                   )}
                </div>
                 {msg.role === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><UserIcon className="w-5 h-5 text-gray-300"/></div>}
              </div>
            )
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary/20 flex items-center justify-center"><BrainCircuitIcon className="w-5 h-5 text-theme-primary"/></div>
              <div className="max-w-md p-3 rounded-lg bg-gray-800 flex items-center justify-center">
                <Spinner size="sm" />
              </div>
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
              placeholder={isListening ? "Listening..." : "Ask anything..."}
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

export default TheLinkModal;