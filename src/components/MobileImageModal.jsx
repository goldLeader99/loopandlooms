import React from 'react';

export default function MobileImageModal({ isOpen, activeImages, currentImageIndex, onClose, onPrevImage, onNextImage }) {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [showControls, setShowControls] = React.useState(false);
  const controlsTimeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      // Prevent body scroll and interaction
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'contain';
      
      // Show controls briefly
      showControlsTemporarily();
    } else {
      // Restore normal scrolling
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
      document.body.style.overscrollBehavior = 'unset';
    }

    return () => {
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
      document.body.style.overscrollBehavior = 'unset';
    };
  }, [isOpen]);

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const threshold = 50;

    if (distance > threshold) {
      // Swipe left - next image
      onNextImage();
      showControlsTemporarily();
    }
    if (distance < -threshold) {
      // Swipe right - prev image
      onPrevImage();
      showControlsTemporarily();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="mobile-modal-overlay"
      onClick={onClose}
    >
      <button 
        className="mobile-modal-close" 
        onClick={onClose}
      >
        ×
      </button>

      <div
        className="mobile-modal-image-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {activeImages.length > 0 && (
          <img
            src={activeImages[currentImageIndex]}
            alt="Product"
            className="mobile-modal-image"
          />
        )}

        {activeImages.length > 1 && (
          <>
            <button 
              className={`mobile-modal-nav prev ${showControls ? 'visible' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onPrevImage();
                showControlsTemporarily();
              }}
            >
              ‹
            </button>
            <button 
              className={`mobile-modal-nav next ${showControls ? 'visible' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onNextImage();
                showControlsTemporarily();
              }}
            >
              ›
            </button>

            <div className="mobile-modal-indicators">
              {activeImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
