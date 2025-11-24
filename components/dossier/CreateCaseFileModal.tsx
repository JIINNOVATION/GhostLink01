
import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';

interface CreateCaseFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => Promise<void>;
  locationName: string;
}

const CreateCaseFileModal: React.FC<CreateCaseFileModalProps> = ({ isOpen, onClose, onSubmit, locationName }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    // Pre-fill and reset state when the modal opens
    if (isOpen) {
      setTitle(`Case File: ${locationName}`);
      setDescription('');
      setSubmissionSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen, locationName]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit(title, description);
    setIsSubmitting(false);
    setSubmissionSuccess(true);
    
    // Close the modal after a short delay to show the success message
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Case File">
      <div className="space-y-4">
        {submissionSuccess ? (
          <div className="text-center p-8 transition-opacity duration-300">
            <h3 className="text-lg font-semibold text-green-400">Case File Saved!</h3>
            <p className="text-gray-300 mt-2">Your notes have been added to your personal investigation files.</p>
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="case-title" className="block text-sm font-medium text-theme-primary mb-1">Case File Name</label>
              <input
                id="case-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="case-description" className="block text-sm font-medium text-theme-primary mb-1">Personal Notes & Theories</label>
              <textarea
                id="case-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Log your observations, theories, or investigation plans here..."
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all h-32 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="bg-gray-700 text-white py-2 px-4 rounded-md border border-gray-600 hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !title.trim() || !description.trim()}
                className="bg-theme-primary/50 text-white py-2 px-4 rounded-md border border-theme-primary hover:bg-theme-primary/70 transition-all duration-300 font-bold flex items-center justify-center gap-2 w-36 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Spinner size="sm" /> : 'Save Case File'}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CreateCaseFileModal;
