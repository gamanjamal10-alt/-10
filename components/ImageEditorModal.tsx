import React, { useState, useRef, useEffect } from 'react';
// Correct import for GoogleGenAI and Modality
import { GoogleGenAI, Modality } from "@google/genai";
import { Modal } from './Modal';
import type { Animal } from '../types';

interface ImageEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    animal: Animal | null;
    onUpdateAnimalImage: (animalId: string, newImageUrl: string) => void;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            // Remove the data URL prefix
            resolve(base64String.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ isOpen, onClose, animal, onUpdateAnimalImage }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
    const aiRef = useRef<GoogleGenAI | null>(null);

    // Reset state when modal opens or animal changes
    useEffect(() => {
        if (isOpen) {
            setPrompt('');
            setError(null);
            setEditedImageUrl(null);
            setIsLoading(false);
        }
    }, [isOpen]);

    const getAiClient = () => {
        if (!aiRef.current) {
            // FIX: Initialize GoogleGenAI with named apiKey parameter
            aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        }
        return aiRef.current;
    };
    
    const handleGenerateImage = async () => {
        if (!prompt.trim() || !animal) return;

        setIsLoading(true);
        setError(null);
        setEditedImageUrl(null);

        try {
            const ai = getAiClient();
            
            // Fetch the image and convert to base64
            // Using a CORS proxy for unsplash images to prevent cross-origin issues
            const response = await fetch(`https://cors-anywhere.herokuapp.com/${animal.imageUrl}`);
            if (!response.ok) {
                 throw new Error('Failed to fetch original image. CORS policy might be blocking the request.');
            }
            const imageBlob = await response.blob();
            const base64Data = await blobToBase64(imageBlob);
            
            const imagePart = {
                inlineData: {
                    data: base64Data,
                    mimeType: imageBlob.type,
                },
            };

            const textPart = {
                text: prompt,
            };

            // FIX: Call generateContent with correct model and parameters for image editing
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [imagePart, textPart],
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            const firstPart = result.candidates?.[0]?.content?.parts?.[0];
            if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
                const newBase64 = firstPart.inlineData.data;
                const newMimeType = firstPart.inlineData.mimeType;
                setEditedImageUrl(`data:${newMimeType};base64,${newBase64}`);
            } else {
                 throw new Error('No image was generated. Please try a different prompt.');
            }

        } catch (e: any) {
            console.error(e);
            setError(e.message || 'An error occurred while editing the image.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = () => {
        if (editedImageUrl && animal) {
            onUpdateAnimalImage(animal.id, editedImageUrl);
        }
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`تعديل صورة ${animal?.name || ''}`}>
            {animal && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="text-center">
                            <h4 className="font-semibold mb-2">الصورة الأصلية</h4>
                            <img src={animal.imageUrl} alt="Original" className="rounded-lg w-full h-48 object-cover mx-auto" />
                        </div>
                        <div className="text-center">
                            <h4 className="font-semibold mb-2">الصورة المعدلة</h4>
                            <div className="rounded-lg w-full h-48 bg-background-light dark:bg-background-dark flex items-center justify-center">
                                {isLoading ? (
                                    <div className="animate-pulse text-text-light-secondary dark:text-dark-secondary">...يتم الإنشاء</div>
                                ) : editedImageUrl ? (
                                    <img src={editedImageUrl} alt="Edited" className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl text-text-light-secondary dark:text-dark-secondary">
                                        image
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-danger text-sm text-center">{error}</p>}

                    <div>
                        <label htmlFor="edit-prompt" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                            وصف التعديل
                        </label>
                        <input
                            id="edit-prompt"
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={isLoading}
                            placeholder="مثال: أضف قبعة رعاة بقر على البقرة"
                            className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary text-text-light-primary dark:text-dark-primary"
                        />
                    </div>
                     <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <button 
                            onClick={handleGenerateImage} 
                            disabled={isLoading || !prompt.trim()}
                            className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">auto_awesome</span>
                            {isLoading ? '...جاري التعديل' : 'تعديل'}
                        </button>
                         <button 
                            onClick={handleSave} 
                            disabled={isLoading || !editedImageUrl}
                            className="w-full px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                        >
                           حفظ الصورة
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
