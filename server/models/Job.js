import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  jobPosition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosition'
  },
  coverLetter: {
    type: String,
    required: true
  },
  resume: {
    type: String // URL or path to file
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'contacted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
