import Team from '../models/Team.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all team members
// @route   GET /api/teams
// @access  Public
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a team member
// @route   POST /api/teams
// @access  Private/Admin
export const createTeam = async (req, res) => {
  const { name, role, category, department, socials, skills } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const team = new Team({
      name,
      role,
      category,
      department,
      image,
      socials: typeof socials === 'string' ? JSON.parse(socials) : socials,
      skills: typeof skills === 'string' ? JSON.parse(skills) : skills
    });

    const createdTeam = await team.save();
    res.status(201).json(createdTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a team member
// @route   PUT /api/teams/:id
// @access  Private/Admin
export const updateTeam = async (req, res) => {
  const { name, role, category, department, socials, skills } = req.body;
  
  try {
    const team = await Team.findById(req.params.id);

    if (team) {
      if (req.file) {
        // Delete old image if it exists
        if (team.image) {
          const oldPath = path.join(__dirname, '..', team.image);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        team.image = `/uploads/${req.file.filename}`;
      }

      team.name = name || team.name;
      team.role = role || team.role;
      team.category = category || team.category;
      team.department = department || team.department;
      team.socials = socials ? (typeof socials === 'string' ? JSON.parse(socials) : socials) : team.socials;
      team.skills = skills ? (typeof skills === 'string' ? JSON.parse(skills) : skills) : team.skills;

      const updatedTeam = await team.save();
      res.json(updatedTeam);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/teams/:id
// @access  Private/Admin
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (team) {
      // Delete image if it exists
      if (team.image) {
        const imagePath = path.join(__dirname, '..', team.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await team.deleteOne();
      res.json({ message: 'Team member removed' });
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

