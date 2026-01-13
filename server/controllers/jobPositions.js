import JobPosition from '../models/JobPosition.js';

// Get active positions (public)
export const getActivePositions = async (req, res) => {
  try {
    const positions = await JobPosition.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all positions (admin)
export const getAllPositions = async (req, res) => {
  try {
    const positions = await JobPosition.find({}).sort({ createdAt: -1 });
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create position (admin)
export const createPosition = async (req, res) => {
  try {
    const position = new JobPosition(req.body);
    const createdPosition = await position.save();
    res.status(201).json(createdPosition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update position (admin)
export const updatePosition = async (req, res) => {
  try {
    const position = await JobPosition.findById(req.params.id);
    if (position) {
      Object.assign(position, req.body);
      const updatedPosition = await position.save();
      res.json(updatedPosition);
    } else {
      res.status(404).json({ message: 'Job position not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete position (admin)
export const deletePosition = async (req, res) => {
  try {
    const position = await JobPosition.findById(req.params.id);
    if (position) {
      await position.deleteOne();
      res.json({ message: 'Job position removed' });
    } else {
      res.status(404).json({ message: 'Job position not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
