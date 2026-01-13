import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  companyName: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved'],
    default: 'new'
  }
}, { timestamps: true });

const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;
