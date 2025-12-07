import React from 'react';
import ProductCard from './ProductCard';

const featuredItems = [

  {
    title: 'Makeup Pouch',
    description: 'Compact and cute crochet pouch perfect for storing cosmetics and beauty essentials on the go.',
    images: [
      '/images/makeup-pouch-1.jpg',
      '/images/makeup-pouch-2.jpg',
      '/images/makeup-pouch-3.jpg',
    ],
    colors: [
      { name: 'Rose', hex: '#e8a8a8' },
      { name: 'Peach', hex: '#f0c8a8' },
      { name: 'Lavender', hex: '#d8c8e8' }
    ],
    shipping: 'Ships in 3–5 days',
    gradient: 'rose',
  },
  {
    title: 'Air Pod Case',
    description: 'Soft and protective crochet case designed to keep your AirPods safe and stylish.',
    images: [
      '/images/air-pod-case-1.jpg',
      '/images/air-pod-case-2.jpg'
    ],
    colors: [
      { name: 'Blush', hex: '#f5d5d0' },
      { name: 'Sage', hex: '#c8dcc8' },
      { name: 'Ivory', hex: '#f5f0e8' }
    ],
    shipping: 'Ships in 2–4 days',
    gradient: 'mint',
  },
  {
    title: 'Crochet Cable',
    description: 'Cozy handmade crochet cable perfect for draping over furniture or staying warm and stylish.',
    images: [
      '/images/crochet-cable-1.jpg',
      '/images/crochet-cable-2.jpg',
      '/images/crochet-cable-3.jpg',
    ],
    colors: [
      { name: 'Cream', hex: '#f5f0e8' },
      { name: 'Gray', hex: '#b8b0a8' },
      { name: 'Charcoal', hex: '#5a5a5a' }
    ],
    shipping: 'Ships in 6–8 days',
    gradient: 'sage',
  },
  {
    title: "Wallet & Clutches",
    description: 'Lightweight and durable crochet wallet with secure compartments for everyday use.',
    images: [
      '/images/wallet-1.jpg',
      '/images/wallet-2.jpg'
    ],
    colors: [
      { name: 'Sea Glass', hex: '#a8d5d5' },
      { name: 'Driftwood', hex: '#a89a8a' },
      { name: 'Mist', hex: '#c8c8c8' }
    ],
    shipping: 'Ships in 5–7 days',
    gradient: 'amber',
  }, {
    title: 'Keychain',
    description: 'Charming handcrafted keychain with sturdy attachment, perfect for adding personality to your keys.',
    images: [],
    colors: [
      { name: 'Clay', hex: '#c97a6e' },
      { name: 'Linen', hex: '#d9c8b8' },
      { name: 'Graphite', hex: '#5a5a5a' }
    ],
    shipping: 'Ships in 3–5 days',
    gradient: 'blush',
  },
  {
    title: 'Car Decor',
    description: 'Cozy and stylish crochet car decor to personalize your vehicle with handmade charm.',
    images: [],
    colors: [
      { name: 'Haze', hex: '#b8a8a0' },
      { name: 'Butter', hex: '#f4e4b8' },
      { name: 'Petal', hex: '#e8b8c8' }
    ],
    shipping: 'Ships in 4–6 days',
    gradient: 'sage',
  },
];

export default function Featured({ searchTerm }) {
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const cardsContainerRef = React.useRef(null);

  const filteredItems = featuredItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset carousel position when search changes
  React.useEffect(() => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollLeft = 0;
      setCurrentCardIndex(0);
    }
  }, [searchTerm]);

  const scrollToCard = (index) => {
    if (cardsContainerRef.current) {
      const cardWidth = cardsContainerRef.current.children[0]?.offsetWidth || 0;
      const gap = 16;
      const scrollAmount = index * (cardWidth + gap);
      cardsContainerRef.current.scrollLeft = scrollAmount;
      setCurrentCardIndex(index);
    }
  };

  const handlePrevCard = () => {
    const newIndex = currentCardIndex > 0 ? currentCardIndex - 1 : filteredItems.length - 1;
    scrollToCard(newIndex);
  };

  const handleNextCard = () => {
    const newIndex = currentCardIndex < filteredItems.length - 1 ? currentCardIndex + 1 : 0;
    scrollToCard(newIndex);
  };

  const handleScroll = () => {
    if (cardsContainerRef.current) {
      const cardWidth = cardsContainerRef.current.children[0]?.offsetWidth || 0;
      const gap = 16;
      const index = Math.round(cardsContainerRef.current.scrollLeft / (cardWidth + gap));
      setCurrentCardIndex(Math.min(index, filteredItems.length - 1));
    }
  };

  return (
    <section id="featured" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">Favorite finishes</p>
            <h2>Textured, timeless, made for everyday use.</h2>
          </div>
          <a className="link" href="#contact">Commission a custom set →</a>
        </div>

        <div className="cards-carousel-wrapper">
          <div
            className="grid cards"
            ref={cardsContainerRef}
            onScroll={handleScroll}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ProductCard item={item} key={item.title} />
              ))
            ) : (
              <div className="no-results">
                <p>No products found matching "{searchTerm}"</p>
              </div>
            )}
          </div>

          {filteredItems.length > 0 && (
            <div className="cards-carousel-controls">
              <button
                className="carousel-btn prev"
                onClick={handlePrevCard}
                aria-label="Previous product"
              >
                ‹
              </button>

              <div className="carousel-dots">
                {filteredItems.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === currentCardIndex ? 'active' : ''}`}
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Go to product ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                className="carousel-btn next"
                onClick={handleNextCard}
                aria-label="Next product"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
