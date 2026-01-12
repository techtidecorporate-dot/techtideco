import Blog from '../models/Blog.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, author, tags, slug, description, readTime, uploadedDate, seoTitle, seoDescription, seoKeywords, metaTags } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const blog = new Blog({ 
      title, 
      content, 
      author, 
      image, 
      tags: typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags,
      slug: slug || title.toLowerCase().split(' ').join('-'),
      description,
      readTime,
      uploadedDate,
      seoTitle,
      seoDescription,
      seoKeywords: typeof seoKeywords === 'string' ? seoKeywords.split(',').map(k => k.trim()) : seoKeywords,
      metaTags
    });
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      if (req.file) {
        // Delete old image if it exists
        if (blog.image) {
          const oldPath = path.join(__dirname, '..', blog.image);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        blog.image = `/uploads/${req.file.filename}`;
      }

      const { tags, seoKeywords, ...rest } = req.body;
      if (tags) {
        blog.tags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
      }
      if (seoKeywords) {
        blog.seoKeywords = typeof seoKeywords === 'string' ? seoKeywords.split(',').map(k => k.trim()) : seoKeywords;
      }
      
      Object.assign(blog, rest);
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      // Delete image if it exists
      if (blog.image) {
        const imagePath = path.join(__dirname, '..', blog.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
