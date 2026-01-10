import express from 'express';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogs.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogs);
router.post('/', protect, admin, createBlog);
router.put('/:id', protect, admin, updateBlog);
router.delete('/:id', protect, admin, deleteBlog);

export default router;
