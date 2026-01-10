import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#000000'
  },
  bgColor: {
    type: String,
    default: '#ffffff'
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
