
import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { GhostIcon } from '../ui/Icons';
import { sendVerificationEmail as sendVerificationEmailService } from '../../services/emailService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Load saved user data on mount
  useEffect(() => {
    if (isOpen) {
      const savedUser = localStorage.getItem('ghostLinkUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setEmail(userData.email || '');
        setPhone(userData.phone || '');
        setUserName(userData.userName || '');
        setMailingAddress(userData.mailingAddress || '');
        if (userData.profileImage) {
          setPreviewUrl(userData.profileImage);
        }
        setIsVerified(userData.verified || false);
      }
    }
  }, [isOpen]);

  const validate = () => {
    if (!firstName || !lastName || !email || !phone || !userName) {
      setError('Please fill in all required fields.');
      return false;
    }
    // Simple email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    // Simple phone validation (at least 7 digits)
    if (!/^\d{7,}$/.test(phone)) {
      setError('Please enter a valid phone number (at least 7 digits).');
      return false;
    }
    setError('');
    return true;
  };

  // Handle image upload and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
    }
  };

  const sendVerificationEmail = () => {
    if (!validate()) return;
    
    // Generate verification code
    const verificationCode = Math.random().toString(36).substr(2, 9).toUpperCase();
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      userName,
      mailingAddress,
      profileImage: previewUrl,
      verificationCode,
      verified: false,
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem('ghostLinkUser', JSON.stringify(userData));
    
    // Send verification email via EmailJS service
    (async () => {
      try {
        const sent = await sendVerificationEmailService(email, firstName, lastName, verificationCode);
        if (sent) {
          console.log(`📧 Verification email sent to ${email}`);
          setVerificationSent(true);
          setError('');
        } else {
          setError('Failed to send verification email. Please try again.');
        }
      } catch (err) {
        console.error('Error sending email:', err);
        setError('Failed to send verification email. Please try again.');
      }
    })();
  };

  const handleVerifyEmail = () => {
    // In a real app, user would enter a verification code sent to their email
    // For now, we'll auto-verify after a delay to simulate email confirmation
    const savedUser = localStorage.getItem('ghostLinkUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      userData.verified = true;
      localStorage.setItem('ghostLinkUser', JSON.stringify(userData));
      setIsVerified(true);
      onLogin();
      setTimeout(() => {
        onClose();
        setVerificationSent(false);
      }, 1000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join The Investigation">
      <div className="text-center p-4">
        <GhostIcon className="w-16 h-16 text-theme-primary mx-auto mb-4 animate-pulse" />
        {verificationSent ? (
          <div>
            <h3 className="text-xl font-bold text-theme-primary mb-4">Check Your Email</h3>
            <p className="text-gray-300 mb-4">
              A verification email has been sent to <strong>{email}</strong>. 
              Please check your inbox and verify your email address to complete registration.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Verification code has been sent to your email. Check your inbox now!
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setVerificationSent(false);
                  setError('');
                }}
                className="bg-gray-700 text-white py-2 px-6 rounded-md border border-gray-600 hover:bg-gray-600 transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={handleVerifyEmail}
                className="bg-theme-primary/50 text-white py-2 px-6 rounded-md border border-theme-primary hover:bg-theme-primary/70 transition-all duration-300 font-bold"
              >
                {isVerified ? 'Verified ✓' : 'Verify Email'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Create a free account to upload your own evidence, create case files, and contribute to the community. Your next discovery could be the key to solving a mystery.
            </p>
            <form className="mb-4 space-y-3 text-left" onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="First Name (required)"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-theme-primary bg-black text-white"
                required
              />
              <input
                type="text"
                placeholder="Last Name (required)"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-theme-primary bg-black text-white"
                required
              />
              <input
                type="email"
                placeholder="Email (required)"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border border-theme-primary bg-black text-white"
                required
              />
              <input
                type="text"
                placeholder="Phone (required)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded border border-theme-primary bg-black text-white"
                required
              />
              <input
                type="text"
                placeholder="User Name (required)"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-theme-primary bg-black text-white"
                required
              />
              <input
                type="text"
                placeholder="Mailing Address (optional)"
                value={mailingAddress}
                onChange={e => setMailingAddress(e.target.value)}
                className="w-full px-4 py-2 rounded border border-theme-primary bg-black text-white"
              />
              <div className="mt-2">
                <label className="block text-theme-primary mb-1">Profile Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-white"
                />
                {previewUrl && (
                  <img src={previewUrl} alt="Profile Preview" className="mt-2 w-20 h-20 rounded-full mx-auto border border-theme-primary object-cover" />
                )}
              </div>
              <div className="text-xs text-gray-400 mt-2">Mailing address is optional and only used to receive special invites, events, and promotional materials.</div>
            </form>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="bg-gray-700 text-white py-2 px-6 rounded-md border border-gray-600 hover:bg-gray-600 transition-all duration-300"
              >
                Maybe Later
              </button>
              <button
                onClick={sendVerificationEmail}
                className="bg-theme-primary/50 text-white py-2 px-6 rounded-md border border-theme-primary hover:bg-theme-primary/70 transition-all duration-300 font-bold"
              >
                Sign Up & Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
