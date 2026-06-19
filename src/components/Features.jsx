import React from 'react';
import './Features.css';

const Features = () => {
  const featureList = [
    {
      icon: "🚚",
      title: "Free Shipping",
      desc: "On orders above ₹999"
    },
    {
      icon: "🏅",
      title: "Premium Quality",
      desc: "Handpicked & Roasted"
    },
    {
      icon: "🛡️",
      title: "Secure Payments",
      desc: "100% Safe & Secure"
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      desc: "We are here to help"
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {featureList.map((feature, index) => (
            <div className="feature-item" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
