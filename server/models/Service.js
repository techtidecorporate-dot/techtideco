import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  icon: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    default: '#000000'
  },
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  seoTitle: {
    type: String
  },
  seoDescription: {
    type: String
  },
  seoKeywords: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
