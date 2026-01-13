import JobApplication from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await JobApplication.find({}).populate('jobPosition').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      resume: req.file ? `/uploads/${req.file.filename}` : undefined
    };
    
    const job = new JobApplication(jobData);
    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateJobStatus = async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    if (job) {
      job.status = req.body.status || job.status;
      const updatedJob = await job.save();
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    if (job) {
      await job.deleteOne();
      res.json({ message: 'Job application removed' });
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
