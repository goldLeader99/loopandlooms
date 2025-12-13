import React from 'react';
import MobileImageModal from './MobileImageModal';

export default function ProductCard({ item }) {
  const [validImages] = React.useState(item.images || []);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [failedImages, setFailedImages] = React.useState(new Set());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 641);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [showControls, setShowControls] = React.useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(null);
  const [showCustomOrderMessage, setShowCustomOrderMessage] = React.useState(false);
  const controlsTimeoutRef = React.useRef(null);
  const customOrderTimeoutRef = React.useRef(null);

  // Detect screen size
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 641);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when modal is open (desktop only)
  React.useEffect(() => {
    if (!isMobile && isModalOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else if (!isMobile) {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      if (!isMobile) {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'unset';
      }
    };
  }, [isModalOpen, isMobile]);

  // Initialize arrow visibility when modal opens
  React.useEffect(() => {
    if (isModalOpen) {
      // Start with arrows hidden on desktop too
      setShowControls(false);
      // Show them briefly so user sees they're available
      showControlsTemporarily();
    }
  }, [isModalOpen]);

  const handleImageError = (index) => {
    setFailedImages(prev => new Set(prev).add(index));
  };

  const handleColorClick = (color, index) => {
    setSelectedColorIndex(index);
    
    // Navigate to first image of this color without restricting carousel
    if (color.imageIndices && color.imageIndices.length > 0) {
      // Navigate to the first image of this color
      setCurrentImageIndex(color.imageIndices[0]);
      setShowCustomOrderMessage(false);
    } else {
      // No images for this color
      setShowCustomOrderMessage(true);
      if (customOrderTimeoutRef.current) {
        clearTimeout(customOrderTimeoutRef.current);
      }
      customOrderTimeoutRef.current = setTimeout(() => {
        setShowCustomOrderMessage(false);
      }, 3000);
    }
  };

  const activeImages = validImages.filter((_, idx) => !failedImages.has(idx));

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const nextImage = () => {
    if (activeImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
      showControlsTemporarily();
    }
  };

  const prevImage = () => {
    if (activeImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
      showControlsTemporarily();
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    showControlsTemporarily();
  };

  const handleTouchEnd = (e) => {
    const newTouchEnd = e.changedTouches[0].clientX;
    setTouchEnd(newTouchEnd);
    
    // Calculate distance
    const distance = touchStart - newTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Only change image if it's a real swipe (distance > 50px)
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
    // Don't call handleSwipe - do swipe detection inline to prevent interference
  };

  const handleSwipe = () => {
    // This function is now handled in handleTouchEnd
  };

  const handleImageClick = () => {
    // Always open modal on click, regardless of swipe
    // Reset touch state to prevent any interference
    setTouchStart(0);
    setTouchEnd(0);
    setIsModalOpen(true);
    setTimeout(() => showControlsTemporarily(), 0);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star full">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    return stars;
  };

  return (
    <article className="card" key={item.title}>
      <div
        className="card-img-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {activeImages.length > 0 ? (
          <>
            <img
              src={activeImages[currentImageIndex]}
              alt={item.title}
              className="card-img"
              onClick={handleImageClick}
              onError={() => handleImageError(validImages.indexOf(activeImages[currentImageIndex]))}
              style={{ cursor: 'pointer' }}
            />
            <div className="watermark">© Loop &amp; Looms</div>
            {activeImages.length > 1 && (
              <>
                <button className={`img-nav prev ${showControls ? 'visible' : ''}`} onClick={prevImage}>‹</button>
                <button className={`img-nav next ${showControls ? 'visible' : ''}`} onClick={nextImage}>›</button>
                <div className="img-indicators">
                  {activeImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className={`card-img gradient ${item.gradient}`} aria-hidden="true" />
        )}
      </div>

      <div className="card-body">
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        {item.rating && (
          <div className="rating-section">
            <div className="stars">
              {renderStars(item.rating)}
            </div>
            <span className="rating-text">{item.rating} ({item.reviews} reviews)</span>
          </div>
        )}

        <div className="colors-section">
          <p className="eyebrow">Available colors</p>
          <div className="color-swatches">
            {item.colors.map((color, index) => (
              <div key={index} className="color-swatch" onClick={() => handleColorClick(color, index)} style={{ cursor: 'pointer', position: 'relative' }}>
                <div 
                  className="swatch-dot" 
                  style={{ 
                    background: color.gradient || color.hex,
                    border: selectedColorIndex === index ? '2px solid #333' : '1px solid #ccc'
                  }}
                ></div>
                {showCustomOrderMessage && selectedColorIndex === index && (!color.imageIndices || color.imageIndices.length === 0) && <span className="custom-order-badge">custom order only</span>}
              </div>
            ))}
          </div>
        </div>
        <p className="shipping">{item.shipping}</p>
      </div>

      {/* Desktop Modal */}
      {!isMobile && isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <div
              className="modal-image-container"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {activeImages.length > 0 && (
                <>
                  <img
                    src={activeImages[currentImageIndex]}
                    alt={item.title}
                    className="modal-image"
                  />
                  <div className="watermark modal-watermark">© Loop &amp; Looms</div>
                  {activeImages.length > 1 && (
                    <>
                      <button className={`modal-nav prev ${showControls ? 'visible' : ''}`} onClick={prevImage}>‹</button>
                      <button className={`modal-nav next ${showControls ? 'visible' : ''}`} onClick={nextImage}>›</button>
                      <div className="modal-indicators">
                        {activeImages.map((_, idx) => (
                          <span
                            key={idx}
                            className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(idx)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="modal-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Modal */}
      {isMobile && (
        <MobileImageModal
          isOpen={isModalOpen}
          activeImages={activeImages}
          currentImageIndex={currentImageIndex}
          onClose={() => setIsModalOpen(false)}
          onPrevImage={prevImage}
          onNextImage={nextImage}
        />
      )}
    </article>
  );
}
