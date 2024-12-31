import React from 'react';
import Navbar from './components/nav/Navbar';
import Hero from './components/landing/Hero';
import Services from './components/landing/Services';
import About from './components/landing/About';
import Contact from './components/landing/Contact';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}

export default App;
