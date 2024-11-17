import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface User {
  username: string;
}

interface Comment {
  user: User;
  content: string;
  createdAt: Date;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  photo: string;
  author: {
    username: string;
  };
  comments: Comment[];
  likes: number; // Now it's a count
}

const BlogDetails: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/blogs/${id}`, { withCredentials: true });
        setBlog(response.data);
      } catch (err) {
        setError('Failed to fetch blog details');
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    return <div className="text-red-500 mb-4">{error}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
    <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">{blog.title}</h2>
  
    {blog.photo && (
      <div className="border border-gray-300 dark:border-strokedark rounded-lg overflow-hidden mb-6 max-w-full">
        <img
          src={`http://localhost:3005/uploads/${blog.photo}`}
          alt={blog.title}
          className="w-full h-auto object-contain max-h-80 mx-auto"
        />
      </div>
    )}
  
    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">{blog.content}</p>
  
    <div className="mb-4 space-y-2">
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        <strong>Created at:</strong> {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        <strong>Author:</strong> {blog.author.username}
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        <strong>Likes:</strong> {blog.likes}
      </p>
    </div>
  
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">Comments</h3>
      {blog.comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No comments yet</p>
      ) : (
        blog.comments.map((comment, index) => (
          <div key={index} className="border-t border-gray-200 dark:border-strokedark pt-4 mt-4">
            <p className="font-semibold text-gray-800 dark:text-gray-200">{comment.user.username}</p>
            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  </div>
  
  );
};

export default BlogDetails;
