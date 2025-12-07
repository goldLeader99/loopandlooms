import React from 'react';

export default function ProductCard({ item }) {
  const [validImages] = React.useState(item.images || []);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [failedImages, setFailedImages] = React.useState(new Set());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [showControls, setShowControls] = React.useState(false);
  const controlsTimeoutRef = React.useRef(null);

  const handleImageError = (index) => {
    setFailedImages(prev => new Set(prev).add(index));
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
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (activeImages.length <= 1) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
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
    <>
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
                onClick={() => {
                  showControlsTemporarily();
                  setIsModalOpen(true);
                }}
                onError={() => handleImageError(validImages.indexOf(activeImages[currentImageIndex]))}
                style={{ cursor: 'pointer' }}
              />
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
              {item.colors.map((color) => (
                <div key={color.name} className="color-swatch">
                  <div className="swatch-dot" style={{ backgroundColor: color.hex }}></div>
                  <span className="swatch-label">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="shipping">{item.shipping}</p>
        </div>
      </article>

      {isModalOpen && (
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
    </>
  );
}
