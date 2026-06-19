import React from 'react';
import './Categories.css';

const Categories = () => {
  const categories = [
    {
      title: "Coffee Beans",
      image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&auto=format&fit=crop&q=60",
      link: "#"
    },
    {
      title: "Café Merchandise",
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60",
      link: "#"
    },
    {
      title: "Brewing Accessories",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60",
      link: "#"
    },
    {
      title: "Gift Boxes",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60",
      link: "#"
    },
    {
      title: "Build Your Coffee Box",
      image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=500&auto=format&fit=crop&q=60",
      link: "#"
    }
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <div className="section-divider">☕</div>
        </div>
        
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <div className="category-card" key={idx}>
              <div className="category-image">
                <img src={cat.image} alt={cat.title} />
              </div>
              <div className="category-overlay">
                <h3 className="category-title">{cat.title}</h3>
                <a href={cat.link} className="category-link">Explore <span>→</span></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
