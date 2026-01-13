import Service from '../models/Service.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    // Parse array/object fields if they come as strings from FormData
    if (typeof data.features === 'string') data.features = JSON.parse(data.features);
    if (typeof data.seoKeywords === 'string') data.seoKeywords = JSON.parse(data.seoKeywords);

    const service = new Service(data);
    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      const data = { ...req.body };

      if (req.file) {
        // Delete old image if it exists and is not a URL
        if (service.image && service.image.startsWith('/uploads/')) {
          const oldPath = path.join(__dirname, '..', service.image);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        data.image = `/uploads/${req.file.filename}`;
      }

      // Parse array/object fields if they come as strings from FormData
      if (typeof data.features === 'string') data.features = JSON.parse(data.features);
      if (typeof data.seoKeywords === 'string') data.seoKeywords = JSON.parse(data.seoKeywords);

      Object.assign(service, data);
      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      // Delete image if it exists and is local
      if (service.image && service.image.startsWith('/uploads/')) {
        const imagePath = path.join(__dirname, '..', service.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await service.deleteOne();
      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
