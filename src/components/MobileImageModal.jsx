import React from 'react';
import ReactDOM from 'react-dom';

export default function MobileImageModal({ isOpen, activeImages, currentImageIndex, onClose, onPrevImage, onNextImage }) {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [showControls, setShowControls] = React.useState(false);
  const controlsTimeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      // Just prevent scroll with simple overflow
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      showControlsTemporarily();
    } else {
      // Restore scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
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
      onNextImage();
      showControlsTemporarily();
    }
    if (distance < -threshold) {
      onPrevImage();
      showControlsTemporarily();
    }
  };

  if (!isOpen || activeImages.length === 0) return null;

  const modalContent = (
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
        <img
          src={activeImages[currentImageIndex]}
          alt="Product"
          className="mobile-modal-image"
        />

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
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Render directly to document.body to ensure it's on top
  return ReactDOM.createPortal(modalContent, document.body);
}
