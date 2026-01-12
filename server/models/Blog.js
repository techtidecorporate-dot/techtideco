import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    default: ''
  },
  uploadedDate: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  slug: {
    type: String,
    unique: true
  },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  metaTags: String
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
