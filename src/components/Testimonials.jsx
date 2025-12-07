import React from 'react';

const testimonials = [
  {
    quote: '"The Cloudline blanket is so soft and weighty—it turned our reading nook into a retreat."',
    person: '— Avery M.',
    image: '/images/testimonial-1.jpg',
  },
  {
    quote: '"I gifted the Mariner\'s Wrap to my mom and she wears it every evening. Beautiful drape and stitch work."',
    person: '— Priya K.',
    image: '/images/testimonial-2.jpg',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="section muted">
      <div className="container split">
        <div>
          <p className="eyebrow">Testimonials</p>
          <h2>Made for cozy nights and everyday rituals.</h2>

          <div className="testimonial-carousel">
            <figure className="testimonial-card">
              {current.image && (
                <div className="testimonial-image">
                  <img src={current.image} alt={current.person} />
                </div>
              )}

              <div className="testimonial-content">
                <blockquote>{current.quote}</blockquote>
                <figcaption>{current.person}</figcaption>
              </div>
            </figure>

            <div className="testimonial-controls">
              <button onClick={handlePrev} className="carousel-btn prev">‹</button>

              <div className="carousel-dots">
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                ))}
              </div>

              <button onClick={handleNext} className="carousel-btn next">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
