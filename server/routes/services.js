import express from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/services.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.post('/', protect, admin, createService);
router.put('/:id', protect, admin, updateService);
router.delete('/:id', protect, admin, deleteService);

export default router;
