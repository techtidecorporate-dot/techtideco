import express from 'express';
import { 
  getActivePositions, 
  getAllPositions, 
  createPosition, 
  updatePosition, 
  deletePosition 
} from '../controllers/jobPositions.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getActivePositions); // Public
router.get('/all', protect, admin, getAllPositions); // Admin only
router.post('/', protect, admin, createPosition); // Admin only
router.put('/:id', protect, admin, updatePosition); // Admin only
router.delete('/:id', protect, admin, deletePosition); // Admin only

export default router;
