const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const { authorizeRole,authorizeUserModification } = require('../midllewares/auth'); 
const upload = require('../midllewares/uploadMiddleware');

// Blog routes
// Create a new blog post
router.post('/blogs',authorizeRole(['superadmin','Blogger'], 'write'), upload.single('photo'), blogController.createBlog);

// Get all blog posts
router.get('/blogs', authorizeRole(['superadmin','Blogger'], 'read'),blogController.getBlogs);

// Get details of a single blog post
router.get('/blogs/:id',authorizeRole(['superadmin','Blogger'], 'read'), blogController.getBlogDetails);

// Update an existing blog post
router.put('/blogs/:id', authorizeRole(['superadmin','Blogger'], 'update'), upload.single('photo'), blogController.updateBlog);

// Delete a blog post
router.delete('/blogs/:id', authorizeRole(['superadmin','Blogger'], 'delete'), blogController.deleteBlog);



module.exports = router;