import React from 'react';

export default function Navigation({ searchTerm, onSearchChange }) {
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);
  const isMobileRef = React.useRef(window.innerWidth <= 720);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth <= 720;
      isMobileRef.current = isMobile;

      if (!isMobile) {
        setIsHeaderVisible(true);
        return;
      }

      // On mobile: Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down (only if scrolled more than 100px)
        setIsHeaderVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Also check on resize
    const handleResize = () => {
      const isMobile = window.innerWidth <= 720;
      isMobileRef.current = isMobile;
      if (!isMobile) {
        setIsHeaderVisible(true);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    
    const target = document.getElementById(targetId);
    if (!target) return;

    // Get header height
    const header = document.querySelector('.topbar');
    const headerHeight = header ? header.offsetHeight : 0;

    // Calculate scroll position
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    // Smooth scroll
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearchChange(e);
    
    // If user types something, scroll to shop
    if (value.trim()) {
      setTimeout(() => {
        handleAnchorClick({ preventDefault: () => {} }, 'featured');
      }, 0);
    }
  };

  return (
    <header className={`topbar ${isHeaderVisible ? 'visible' : 'hidden'}`}>
      <div className="container">
        <div className="logo">Loop &amp; Looms</div>
        <div className="nav-wrapper">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="nav-search"
            />
            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => {
                  onSearchChange({ target: { value: '' } });
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <nav className="nav" aria-label="Primary">
            <a href="#featured" onClick={(e) => handleAnchorClick(e, 'featured')}>Shop</a>
            <a href="#about" onClick={(e) => handleAnchorClick(e, 'about')}>About</a>
            <a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
