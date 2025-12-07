import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container split">
        <div className="hero-copy">
          <p className="eyebrow">Handcrafted crochet for cozy living</p>
          <h1>Soft, heirloom-quality pieces stitched to order.</h1>
          <p className="lead">
            From makeup pouches to air pods cases, every Loop &amp; Looms piece is made in small batches with natural fibers and
            care that shows in every stitch.
          </p>
          <div className="actions">
            <a className="btn primary" href="#featured">Shop favorites</a>
          </div>
          <div className="stats">
            <div>
              <strong>Happy Customers</strong>
              <span>4</span>
            </div>
            <div>
              <strong>Natural</strong>
              <span>fibers &amp; sustainable sourcing</span>
            </div>
            <div>
              <strong>Custom</strong>
              <span>colors and sizing available</span>
            </div>
          </div>
          <div className="badges">
            <span className="badge">🏢 Small Business</span>
            <span className="badge">👩‍💼 Women-Owned</span>
          </div>
        </div>
      </div>
    </section>
  );
}
