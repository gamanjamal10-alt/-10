import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Modal } from './Modal';
import Markdown from 'react-markdown';
import type { Task, Alert, Animal } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface Message {
    role: 'user' | 'model';
    parts: string;
}

interface AssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    appData: {
        tasks: Task[];
        alerts: Alert[];
        herd: Animal[];
    }
}

export const AssistantModal: React.FC<AssistantModalProps> = ({ isOpen, onClose, appData }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const generateContext = () => {
        // Add completion status to tasks for better context
        const tasksWithStatus = appData.tasks.map(({ id, title, dueDate, priority, completed }) => ({
             id, title, dueDate, priority, completed: !!completed 
        }));

        return `
        Here is the current farm data for "حضيرتي":
        - Upcoming Tasks: ${JSON.stringify(tasksWithStatus)}
        - Recent Alerts: ${JSON.stringify(appData.alerts)}
        - Herd Status: ${JSON.stringify(appData.herd)}
        `;
    };

    useEffect(() => {
        if (isOpen) {
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'أنت مساعد ذكاء اصطناعي خبير في تطبيق "حضيرتي" لإدارة مزارع الألبان الحديثة. دورك هو مساعدة مدير المزرعة في المهام والتحليلات والمعلومات المتعلقة بصحة القطيع وإنتاج الحليب والعمليات اليومية. قدم نصائح موجزة وعملية ومبنية على البيانات. يجب أن تكون جميع ردودك باللغة العربية. كن على علم بأن المهام لديها خاصية "completed" والتي تعني أنها أنجزت.',
                },
            });
            setHistory([]);
            setPrompt('');
            setError(null);
            getDailySummary();
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isLoading]);

    const getDailySummary = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const context = generateContext();
            const summaryPrompt = "قدم لي ملخصًا صباحيًا موجزًا عن حالة المزرعة اليوم بناءً على هذه البيانات. سلط الضوء على أهم 3 نقاط تتطلب انتباهي، مع الأخذ في الاعتبار المهام المكتملة وغير المكتملة.";
            
            // This is a temporary chat session for the summary
            const summaryChat = ai.chats.create({ model: 'gemini-2.5-flash' });
            const result = await summaryChat.sendMessage({ message: `${context}\n\n${summaryPrompt}` });

            const modelResponse: Message = { role: 'model', parts: result.text };
            setHistory([modelResponse]);
        } catch (e) {
            console.error(e);
            setError('عذرًا، لم أتمكن من إنشاء الملخص اليومي.');
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!prompt.trim() || !chatRef.current) return;

        setIsLoading(true);
        setError(null);
        
        const userMessage: Message = { role: 'user', parts: prompt };
        setHistory(prev => [...prev, userMessage]);
        
        const currentPrompt = prompt;
        setPrompt('');

        try {
            const context = generateContext();
            const result = await chatRef.current.sendMessage({ message: `${context}\n\nUser question: ${currentPrompt}`});
            const modelResponse: Message = { role: 'model', parts: result.text };
            setHistory(prev => [...prev, modelResponse]);

        } catch (e) {
            console.error(e);
            setError('عذرًا، حدث خطأ أثناء التواصل مع المساعد. يرجى المحاولة مرة أخرى.');
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
                    {history.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-2xl max-w-[85%] ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-background-light dark:bg-card-dark rounded-bl-none text-text-light-primary dark:text-dark-primary'}`}>
                                <Markdown className="prose prose-sm dark:prose-invert max-w-none break-words">{msg.parts}</Markdown>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                             <div className="p-3 rounded-2xl max-w-[80%] bg-background-light dark:bg-card-dark rounded-bl-none">
                                <p className="text-text-light-secondary dark:text-dark-secondary animate-pulse">...يفكر</p>
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
                    <button onClick={sendMessage} disabled={isLoading || !prompt.trim()} className="p-2 bg-primary text-white rounded-full disabled:opacity-50 flex items-center justify-center w-10 h-10 transition-opacity">
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
};