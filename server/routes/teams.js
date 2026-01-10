import express from 'express';
import multer from 'multer';
import path from 'path';
import { getTeams, createTeam, updateTeam, deleteTeam } from '../controllers/teams.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'));
  },
});

router.get('/', getTeams);
router.post('/', protect, admin, upload.single('image'), createTeam);
router.put('/:id', protect, admin, upload.single('image'), updateTeam);
router.delete('/:id', protect, admin, deleteTeam);

export default router;

