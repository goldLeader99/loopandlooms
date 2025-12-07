import './index.css';
import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Featured from './components/Featured';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <>
      <Navigation
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      <main>
        <Hero />
        <Featured searchTerm={searchTerm} />
        <About />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
