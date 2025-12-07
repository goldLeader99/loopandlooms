import React from 'react';

export default function MobileImageModal({ isOpen, activeImages, currentImageIndex, onClose, onPrevImage, onNextImage }) {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [showControls, setShowControls] = React.useState(false);
  const controlsTimeoutRef = React.useRef(null);
  const scrollPosRef = React.useRef(0);

  React.useEffect(() => {
    if (isOpen) {
      // Save scroll position
      scrollPosRef.current = window.scrollY;
      
      // Prevent scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      // Show controls briefly
      showControlsTemporarily();
    } else {
      // Restore scroll
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
      document.documentElement.style.position = 'unset';
      document.documentElement.style.width = 'unset';
      document.documentElement.style.height = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
      
      // Restore scroll position
      window.scrollTo(0, scrollPosRef.current);
    }

    return () => {
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
      document.documentElement.style.position = 'unset';
      document.documentElement.style.width = 'unset';
      document.documentElement.style.height = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
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
