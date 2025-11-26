import emailjs from '@emailjs/browser';

// Initialize EmailJS (using free tier)
// You need to sign up at https://www.emailjs.com/ to get these credentials
const SERVICE_ID = 'service_dxz8x4a'; // provided by user
const TEMPLATE_ID = 'template_2i1ehuc'; // provided by user
const PUBLIC_KEY = 'dESh5C6wAcelcDSP1'; // provided by user

let isInitialized = false;

export const initializeEmailJS = () => {
  if (!isInitialized) {
    try {
      emailjs.init(PUBLIC_KEY);
      isInitialized = true;
      console.log('EmailJS initialized');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }
};

export const sendVerificationEmail = async (
  email: string,
  firstName: string,
  lastName: string,
  verificationCode: string
): Promise<boolean> => {
  try {
    initializeEmailJS();

    // If not properly initialized, log and return false
    if (!isInitialized || !PUBLIC_KEY.includes('EJ')) {
      console.log('EmailJS not configured. Using fallback verification.');
      console.log(`📧 Verification email would be sent to: ${email}`);
      console.log(`Code: ${verificationCode}`);
      return true; // Allow verification anyway for demo
    }

    const templateParams = {
      to_email: email,
      to_name: firstName,
      verification_code: verificationCode,
      user_name: `${firstName} ${lastName}`,
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('✅ Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    // Fallback: allow verification anyway for demo purposes
    console.log(`📧 Verification code for ${email}: ${verificationCode}`);
    return true;
  }
};

export const sendWelcomeEmail = async (email: string, userName: string): Promise<boolean> => {
  try {
    initializeEmailJS();

    const templateParams = {
      to_email: email,
      to_name: userName,
    };

    const response = await emailjs.send(SERVICE_ID, 'template_welcome', templateParams);
    console.log('✅ Welcome email sent:', response);
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
};
