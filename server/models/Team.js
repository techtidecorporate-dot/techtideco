import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true // e.g., CEO, Executive Leadership, Head, Senior, Junior, Intern
  },
  department: {
    type: String,
    required: false // Optional for executive roles like CEO
  },

  image: {
    type: String,
    default: ''
  },
  socials: {
    linkedin: String,
    twitter: String,
    github: String
  },
  skills: [String]
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
export default Team;
