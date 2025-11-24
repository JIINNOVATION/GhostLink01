
import React, { useState, useEffect, useRef } from 'react';
import { generateLocationImage } from '../../services/geminiService';
import Spinner from '../ui/Spinner';

interface ImageGalleryItemProps {
    mediaItem: { type: 'image' | 'video'; url: string; caption: string };
    locationName: string;
}

// In-memory cache for generated images for the current session.
const generatedImageCache: Record<string, string> = {};

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({ mediaItem, locationName }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(mediaItem.url);
    const [status, setStatus] = useState<'loading' | 'error' | 'generating' | 'loaded'>('loading');
    const hasAttemptedGeneration = useRef(false);

    const generateAndSetImage = async () => {
        // Create a unique key for caching based on location and caption.
        const cacheKey = `${locationName}::${mediaItem.caption}`;
        if (generatedImageCache[cacheKey]) {
            setImageUrl(generatedImageCache[cacheKey]);
            setStatus('loaded');
            return;
        }

        setStatus('generating');
        hasAttemptedGeneration.current = true;
        
        // Refined prompt for more atmospheric and relevant images.
        const prompt = `Create a highly detailed, photo-realistic image capturing the essence of: '${mediaItem.caption}' at '${locationName}'. Emulate the style of a historic photograph from the appropriate era (e.g., daguerreotype for the 19th century, grainy black and white for the mid-20th century). The mood must be profoundly atmospheric and eerie. Emphasize dramatic lighting, deep shadows, and a sense of aged mystery. The image should look like a genuine, discovered piece of evidence. Strictly avoid modern elements.`;
        
        try {
            const generatedUrl = await generateLocationImage(prompt);
            // The service returns a specific SVG on failure.
            if (generatedUrl.startsWith('data:image/svg+xml')) {
                throw new Error("Image generation failed at service level.");
            }
            generatedImageCache[cacheKey] = generatedUrl; // Cache the successful result.
            setImageUrl(generatedUrl);
            setStatus('loaded');
        } catch (err) {
            console.error("Image generation failed:", err);
            setStatus('error');
        }
    };

    useEffect(() => {
        // Reset state when the media item prop changes.
        setImageUrl(mediaItem.url);
        setStatus(mediaItem.url ? 'loading' : 'generating');
        hasAttemptedGeneration.current = false;
        
        if (!mediaItem.url) {
            generateAndSetImage();
        }
    }, [mediaItem.url, mediaItem.caption, locationName]);

    const handleImageError = () => {
        // This fallback triggers only once per component instance to avoid excessive API calls.
        if (!hasAttemptedGeneration.current) { 
            console.warn(`Image failed to load: ${mediaItem.url}. Generating fallback.`);
            generateAndSetImage();
        } else {
            // If we've already tried generating and it still fails, set error state.
            setStatus('error');
        }
    };

    const renderStatus = () => {
        switch (status) {
            case 'generating':
                return (
                    <div className="text-center p-4">
                        <Spinner size="md" />
                        <p className="text-theme-primary text-xs mt-2 animate-pulse">Generating fallback image...</p>
                    </div>
                );
            case 'error':
                return (
                    <div className="text-center p-4">
                        <p className="text-theme-primary text-sm">Image Unavailable</p>
                    </div>
                );
            case 'loading':
                 // Show a spinner while the initial image is loading, but keep the img tag present
                 return <Spinner size="md" />;
            default:
                return null;
        }
    }

    return (
        <div className="w-full rounded-lg overflow-hidden bg-black border border-theme-primary/20 shadow-lg" style={{ boxShadow: '0 4px 15px rgba(var(--theme-primary-rgb), 0.1)' }}>
            <div className="relative h-48 w-full bg-gray-900 flex items-center justify-center">
                {status !== 'loaded' && renderStatus()}
                
                {imageUrl && (
                    <img 
                        src={imageUrl} 
                        alt={mediaItem.caption} 
                        className={`w-full h-full object-cover transition-opacity duration-300 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setStatus('loaded')}
                        onError={handleImageError}
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
    