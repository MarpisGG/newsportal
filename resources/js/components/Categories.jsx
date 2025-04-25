import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch categories:', err);
      });
  }, []);

  return (
    <div>
        <Navbar />
      <h2>Kategori Berita</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}
            {category.image && (
              <img src={`http://localhost:8000/storage/${category.image}`} alt={category.name} style={{ width: '100px' }} />
            )}
          </li>
        ))}
      </ul>
        <Footer />
    </div>
  );
};

export default Categories;
