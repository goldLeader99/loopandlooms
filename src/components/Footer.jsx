import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <div className="logo">Loop &amp; Looms</div>
          <p className="small">Handmade crochet pieces crafted with love.</p>
        </div>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-meta">
          <p>© 2025 Loop &amp; Looms.</p>
          <a href="https://www.instagram.com/loop_n_looms?igsh=ejEwNWZocjJybmZ6&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.251-.149-4.771-1.699-4.919-4.92-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
