const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const fs = require('fs');
const path = require('path');




// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const photo = req.file ? req.file.path : '';

    const blog = new Blog({
      title,
      content,
      photo,
      author: req.user.id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all blog posts
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username').populate('comments');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getBlogDetails = async (req, res) => {
    try {
      // Find blog by ID and populate fields
      const blog = await Blog.findById(req.params.id)
        .populate('author', 'username') // Populate author field with username
        .populate({
          path: 'comments',
          populate: {
            path: 'user', // Assuming comments have a user reference
            select: 'username'
          }
        })
        .exec();
      
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      
      // Transform data
      const transformedBlog = {
        ...blog._doc,
        photo: blog.photo ? path.basename(blog.photo) : null, // Extract only the filename
        likes: blog.likes.length // Transform likes to count
      };
  
      res.status(200).json(transformedBlog);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  // Update a blog post
  exports.updateBlog = async (req, res) => {
    try {
      const { title, content } = req.body;
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      // Ensure the logged-in user is the author
      if (blog.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized: You do not own this blog' });
    }
  
      // Update fields
      blog.title = title || blog.title;
      blog.content = content || blog.content;
  
      // Handle photo update
      if (req.file) {
        // Remove old photo if it exists
        if (blog.photo) {
          fs.unlinkSync(path.resolve(blog.photo));
        }
        blog.photo = req.file.path;
      }
  
      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.id;  // Ensure the user ID is obtained from req.user

        // Find and delete the blog
        const blog = await Blog.findOneAndDelete({ _id: blogId, author: userId });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found or you are not authorized to delete it' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error("Error in deleteBlog:", error);  // Log error details
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};