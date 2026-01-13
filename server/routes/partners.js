import express from 'express';
import { createPartnerRequest, getPartnerRequests } from '../controllers/partners.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createPartnerRequest);
router.get('/', protect, admin, getPartnerRequests);

export default router;
