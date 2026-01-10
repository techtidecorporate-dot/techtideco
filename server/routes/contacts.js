import express from 'express';
import { getContacts, createContact, updateContactStatus, deleteContact } from '../controllers/contacts.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, admin, getContacts);
router.post('/', createContact); // Public for users
router.put('/:id', protect, admin, updateContactStatus);
router.delete('/:id', protect, admin, deleteContact);

export default router;
