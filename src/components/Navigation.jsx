import React from 'react';

export default function Navigation({ searchTerm, onSearchChange }) {
  return (
    <header className="topbar">
      <div className="container">
        <div className="logo">Loop &amp; Looms</div>
        <div className="nav-wrapper">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={onSearchChange}
              className="nav-search"
            />
            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => onSearchChange({ target: { value: '' } })}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <nav className="nav" aria-label="Primary">
            <a href="#featured">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
