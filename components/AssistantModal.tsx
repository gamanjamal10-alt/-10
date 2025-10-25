// FIX: Replaced placeholder content with a full implementation for the AssistantModal component, adhering to the @google/genai SDK guidelines.
import React, { useState, useEffect, useRef } from 'react';
// FIX: Use GoogleGenAI and Chat from @google/genai as per guidelines
import { GoogleGenAI, Chat } from "@google/genai";
import { Modal } from './Modal';
import Markdown from 'react-markdown';

// FIX: Initialize GoogleGenAI with named apiKey parameter and outside component.
// Per instructions, API_KEY is available from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface Message {
    role: 'user' | 'model';
    parts: string;
}

export const AssistantModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            // FIX: Use ai.chats.create for chat session management as per guidelines.
            chatRef.current = ai.chats.create({
                // FIX: Use 'gemini-2.5-flash', a recommended model for basic text tasks.
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are an expert AI assistant for a modern dairy farm. Your role is to help the farm manager with tasks, analysis, and information related to herd health, milk production, and daily operations. Provide concise, practical, and data-driven advice. All your responses should be in Arabic.',
                },
            });
            // Reset state for new session
            setHistory([]);
            setPrompt('');
            setError(null);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isLoading]);


    const sendMessage = async () => {
        if (!prompt.trim() || !chatRef.current) return;

        setIsLoading(true);
        setError(null);
        
        const userMessage: Message = { role: 'user', parts: prompt };
        setHistory(prev => [...prev, userMessage]);
        setPrompt('');

        try {
            const result = await chatRef.current.sendMessage({ message: prompt });
            // FIX: Use the response.text property to get the model's text response, as per guidelines.
            const modelResponse: Message = { role: 'model', parts: result.text };
            setHistory(prev => [...prev, modelResponse]);

        } catch (e) {
            console.error(e);
            setError('عذرًا، حدث خطأ أثناء التواصل مع المساعد. يرجى المحاولة مرة أخرى.');
            // Rollback user message on error
            setHistory(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isLoading) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="المساعد الذكي">
            <div className="flex flex-col h-[60vh]">
                <div className="flex-1 overflow-y-auto p-2 space-y-4">
                    {history.length === 0 && !isLoading && (
                        <div className="text-center text-text-light-secondary dark:text-dark-secondary pt-10">
                            <span className="material-symbols-outlined text-5xl">smart_toy</span>
                            <p className="mt-2">كيف يمكنني مساعدتك في إدارة المزرعة اليوم؟</p>
                        </div>
                    )}
                    {history.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-background-light dark:bg-background-dark rounded-bl-none'}`}>
                                <Markdown className="prose prose-sm dark:prose-invert max-w-none break-words">{msg.parts}</Markdown>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                             <div className="p-3 rounded-2xl max-w-[80%] bg-background-light dark:bg-background-dark rounded-bl-none">
                                <span className="animate-pulse">...يفكر</span>
                            </div>
                        </div>
                    )}
                    {error && <p className="text-danger text-sm text-center">{error}</p>}
                    <div ref={messagesEndRef} />
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-border-light dark:border-border-dark pt-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="اسأل عن أي شيء..."
                        disabled={isLoading}
                        className="flex-1 p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary text-text-light-primary dark:text-dark-primary"
                    />
                    <button onClick={sendMessage} disabled={isLoading || !prompt.trim()} className="p-2 bg-primary text-white rounded-full disabled:bg-gray-400 flex items-center justify-center w-10 h-10">
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
};
