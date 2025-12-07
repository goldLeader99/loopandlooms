import React from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    request: '',
    timeline: '',
    website: '' // Honeypot field - hidden from users
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');
  const [submitError, setSubmitError] = React.useState('');
  const [lastSubmitTime, setLastSubmitTime] = React.useState(0);

  // Initialize EmailJS
  React.useEffect(() => {
    emailjs.init('RQSvFbH9PbHgq40A-');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Spam detection function
  const isLikelySpam = (text) => {
    if (!text) return false;
    
    const spamKeywords = [
      'viagra', 'cialis', 'casino', 'lottery', 'click here', 'buy now',
      'cheap', 'free money', 'bitcoin', 'crypto', 'forex', 'stock',
      'weight loss', 'diet pills', 'pharmacy', 'rolex', 'replica',
      'http://', 'https://', '.com', '.net', '.org', // URLs
      'follow me', 'subscribe', '@', '@@' // Social spam
    ];
    
    const lowerText = text.toLowerCase();
    return spamKeywords.some(keyword => lowerText.includes(keyword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check - if website field has value, it's likely a bot
    if (formData.website.trim()) {
      console.warn('Honeypot triggered - likely spam');
      setSubmitMessage('✓ Order received! You\'ll get a personal reply with next steps soon.');
      setFormData({ name: '', email: '', request: '', timeline: '', website: '' });
      return; // Pretend success to confuse bots
    }

    // Rate limiting - prevent rapid-fire submissions (bots often submit multiple times per second)
    const now = Date.now();
    if (now - lastSubmitTime < 2000) {
      setSubmitError('Please wait a moment before submitting again.');
      return;
    }
    setLastSubmitTime(now);

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.request.trim()) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    // Spam keyword detection
    if (isLikelySpam(formData.name) || isLikelySpam(formData.request)) {
      setSubmitError('Your submission contains invalid content. Please try again.');
      return;
    }

    // Check request length (too short or too long likely spam)
    if (formData.request.trim().length < 10) {
      setSubmitError('Please provide more details about your custom order (at least 10 characters).');
      return;
    }

    if (formData.request.trim().length > 2000) {
      setSubmitError('Your message is too long. Please keep it under 2000 characters.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      // Send email to owner
      const ownerEmailResult = await emailjs.send('service_y8j2lyb', 'template_kc73j72', {
        to_email: 'loopandlooms0@gmail.com',
        customer_name: formData.name,
        customer_email: formData.email,
        customer_request: formData.request,
        ideal_date: formData.timeline || 'Not specified',
        from_name: 'Loop & Looms Contact Form'
      });

      // Send confirmation email to customer
      try {
        await emailjs.send('service_y8j2lyb', 'template_cou9r5g', {
          to_email: formData.email,
          customer_name: formData.name,
        });
      } catch (confirmError) {
        console.warn('Confirmation email failed, but order email sent:', confirmError);
        // Continue anyway since the important email to owner was sent
      }

      setSubmitMessage('✓ Order received! You\'ll get a personal reply with next steps soon.');
      setFormData({ name: '', email: '', request: '', timeline: '', website: '' });
    } catch (error) {
      console.error('Email error:', error);
      setSubmitError('Something went wrong. Please try emailing loopandlooms0@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container split">
        <div>
          <p className="eyebrow">Reach out</p>
          <h2>Let&apos;s make something special.</h2>

          <p className="lead">
            Share your project idea, preferred fibers, or color palette.
          </p>

          <ul className="contact-list">
            <li><strong>Email:</strong> loopandlooms0@gmail.com</li>
            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/loop_n_looms?igsh=ejEwNWZocjJybmZ6&utm_source=qr" target="_blank" rel="noopener noreferrer">@loop_n_looms</a></li>
            <li><strong>Location:</strong> Toronto, Canada</li>
          </ul>
        </div>

        <div className="contact-card">
          <h3>Custom order form</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              required 
              value={formData.name}
              onChange={handleInputChange}
            />

            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* Honeypot field - hidden from users, catches bots */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />

            <label htmlFor="request">What are you dreaming up?</label>
            <textarea 
              id="request" 
              name="request" 
              rows="4" 
              required 
              value={formData.request}
              onChange={handleInputChange}
            />

            <label htmlFor="timeline">Ideal delivery date</label>
            <input 
              id="timeline" 
              name="timeline" 
              type="date" 
              value={formData.timeline}
              onChange={handleInputChange}
            />

            <button 
              type="submit" 
              className="btn primary block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Start a custom order'}
            </button>
          </form>

          {submitMessage && (
            <p className="success-message">{submitMessage}</p>
          )}
          {submitError && (
            <p className="error-message">{submitError}</p>
          )}
          <p className="small">You&apos;ll get a personal reply with next steps.</p>
        </div>
      </div>
    </section>
  );
}
