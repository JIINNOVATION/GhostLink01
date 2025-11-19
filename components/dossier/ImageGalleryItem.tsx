
import React, { useState, useEffect } from 'react';
import { generateLocationImage } from '../../services/geminiService';
import Spinner from '../ui/Spinner';

interface ImageGalleryItemProps {
    mediaItem: { type: 'image' | 'video'; url: string; caption: string };
    locationName: string;
}

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({ mediaItem, locationName }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const generateImage = async () => {
            setIsGenerating(true);
            try {
                // Refined prompt for more atmospheric and relevant images.
                const prompt = `Generate a photo-realistic image depicting: '${mediaItem.caption}' at the location of '${locationName}'. The style should be reminiscent of a vintage photograph from the relevant historical period, possibly with some film grain or a sepia tone. The mood must be atmospheric, eerie, and deeply historical. Use low-light, dramatic shadows, and a muted color palette to enhance the sense of mystery and age. Avoid any modern elements unless they are specifically mentioned in the caption.`;
                const generatedUrl = await generateLocationImage(prompt);
                setImageUrl(generatedUrl);
            } finally {
                setIsGenerating(false);
            }
        };

        if (mediaItem.url) {
            setImageUrl(mediaItem.url);
        } else {
            generateImage();
        }
    }, [mediaItem, locationName]);

    return (
        <div className="w-full rounded-lg overflow-hidden bg-black border border-theme-primary/20 shadow-lg" style={{ boxShadow: '0 4px 15px rgba(var(--theme-primary-rgb), 0.1)' }}>
            <div className="relative h-48 w-full bg-gray-900 flex items-center justify-center">
                {isGenerating && <Spinner size="md" />}
                {imageUrl && !isGenerating && (
                    <img 
                        src={imageUrl} 
                        alt={mediaItem.caption} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                )}
            </div>
            <div className="p-3 bg-black">
                <p className="text-xs text-gray-400 leading-tight">{mediaItem.caption}</p>
            </div>
        </div>
    );
};

export default ImageGalleryItem;
