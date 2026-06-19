import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <div className="newsletter-content">
            <h3>Love coffee? Get exclusive offers, <br/>new arrivals & brewing tips.</h3>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
