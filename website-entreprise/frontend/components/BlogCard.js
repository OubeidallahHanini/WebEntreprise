import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from './common/Card';

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogData'); // Assurez-vous que ce chemin correspond à votre API
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='container blog-card grid-2 py'>
      {blogs.map((item) => (
        <div key={item.id} className='blog-card-item'>
          
          <Card data={item} path='blogs' />
        </div>
      ))}
    </div>
  );
};

export default BlogCard;