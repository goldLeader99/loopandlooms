import React from 'react';

const pillars = [
  { title: 'Intentional', copy: 'Patterns are refined for drape, durability, and the softest feel against skin.' },
  { title: 'Honest materials', copy: 'We source natural fibers and partner with mills that value sustainability.' },
  { title: 'Made for you', copy: 'Custom sizes, palettes, and gift notes ensure your piece is truly yours.' },
];

export default function About() {
  return (
    <section id="about" className="section muted">
      <div className="container split">
        <div>
          <p className="eyebrow">Meet the maker</p>
          <h2>Hi, I&apos;m Bhavi—your friendly neighborhood crocheter.</h2>
          <p className="lead">
            I learned to crochet at my grandmother&apos;s kitchen table and turned that love into Loop &amp; Looms.
          </p>

          <div className="pillars">
            {pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="story-card">
          <h3>Studio peek</h3>
          <p>Each order is hand-stitched in a light-filled studio with small-batch care.</p>
          <ul className="checklist">
            <li>Small-batch drops every month</li>
            <li>Gift-ready packaging available</li>
            <li>Repairs and refreshes on request</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
