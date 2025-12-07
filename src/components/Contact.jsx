import React from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    request: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');
  const [submitError, setSubmitError] = React.useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.request.trim()) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      // Send email to owner
      await emailjs.send('service_y8j2lyb', 'template_kc73j72', {
        to_email: 'loopandlooms0@gmail.com',
        customer_name: formData.name,
        customer_email: formData.email,
        customer_request: formData.request,
        ideal_date: formData.timeline || 'Not specified',
        from_name: 'Loop & Looms Contact Form'
      });

      // Send confirmation email to customer
      await emailjs.send('service_y8j2lyb', 'template_cou9r5g', {
        to_email: formData.email,
        customer_name: formData.name,
      });

      setSubmitMessage('✓ Order received! You\'ll get a personal reply with next steps soon.');
      setFormData({ name: '', email: '', request: '', timeline: '' });
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
