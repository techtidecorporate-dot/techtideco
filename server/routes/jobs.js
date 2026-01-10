import express from 'express';
import { getJobs, createJob, updateJobStatus, deleteJob } from '../controllers/jobs.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, admin, getJobs);
router.post('/', createJob); // Public for applicants
router.put('/:id', protect, admin, updateJobStatus);
router.delete('/:id', protect, admin, deleteJob);

export default router;
