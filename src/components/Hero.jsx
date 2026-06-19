import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text">
          <p className="hero-subtitle">PREMIUM COFFEE & CAFÉ MERCHANDISE</p>
          <h1 className="hero-title">
            Brew Your <span className="highlight">Perfect</span> <br/> Moment
          </h1>
          <p className="hero-description">
            Discover premium coffee beans, stylish café merchandise and build your own custom coffee box.
          </p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            <button className="btn btn-outline">Build Your Coffee Box</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
