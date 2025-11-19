
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (caption: string) => Promise<void>;
  photoPreviewUrl: string;
  locationName: string;
}

const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({ isOpen, onClose, onSubmit, photoPreviewUrl, locationName }) => {
  const [caption, setCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit(caption);
    setIsSubmitting(false);
    setSubmissionSuccess(true);
    
    // Close the modal after a short delay
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    // Reset state for next time
    setCaption('');
    setSubmissionSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Upload Photo for ${locationName}`}>
      <div className="space-y-4">
        {submissionSuccess ? (
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold text-green-400">Upload Successful!</h3>
            <p className="text-gray-300 mt-2">Your photo has been submitted for review. Thank you for your contribution!</p>
          </div>
        ) : (
          <>
            <img src={photoPreviewUrl} alt="Preview" className="w-full h-64 object-cover rounded-lg border border-theme-primary/30" />
            
            <div>
              <label htmlFor="caption" className="block text-sm font-medium text-theme-primary mb-1">Caption</label>
              <textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Describe the photo (e.g., 'View from the east wing at dusk')"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all h-24 resize-none"
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">{caption.length} / 200</p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={handleClose}
                className="bg-gray-700 text-white py-2 px-4 rounded-md border border-gray-600 hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !caption.trim()}
                className="bg-theme-primary/50 text-white py-2 px-4 rounded-md border border-theme-primary hover:bg-theme-primary/70 transition-all duration-300 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Spinner size="sm" /> : 'Submit for Review'}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default UploadPhotoModal;
