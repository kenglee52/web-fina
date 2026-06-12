const pool = require('../config/connect_DB');
const fs = require('fs').promises;
const path = require('path');

// Input validation
const validateSliderInput = (data) => {
  const { title, description } = data;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Title is required and must be a non-empty string');
  }
  if (description && typeof description !== 'string') {
    throw new Error('Description must be a string');
  }
};

// Sanitize file path to prevent path traversal
const sanitizeFilePath = (filePath) => {
  const baseDir = path.join(__dirname, '../file/slider');
  const resolvedPath = path.resolve(baseDir, path.basename(filePath));
  if (!resolvedPath.startsWith(baseDir)) {
    throw new Error('Invalid file path');
  }
  return resolvedPath;
};

// Delete file safely
const deleteFile = async (filePath) => {
  try {
    await fs.unlink(sanitizeFilePath(filePath));
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err; // Rethrow if not "file not found"
    }
  }
};

// Create slider
exports.createSlider = async (req, res) => {
  try {
    const { title, description } = req.body;
    validateSliderInput({ title, description });

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const image_url = `/file/slider/${req.file.filename}`;
    await pool.query(
      'INSERT INTO sliders (image_url, title, description) VALUES ($1, $2, $3)',
      [image_url, title, description || null]
    );
    res.json({ message: 'Slider added successfully!', data: { image_url, title, description } });
  } catch (err) {
    if (req.file) {
      // Clean up uploaded file on error
      try {
        await deleteFile(path.join(__dirname, '../file/slider', req.file.filename));
      } catch (unlinkErr) {
        console.error('Failed to clean up file:', unlinkErr);
      }
    }
    res.status(500).json({ message: 'Failed to add slider' });
  }
};

// Get all sliders
exports.getSliders = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, image_url, title, description FROM sliders ORDER BY id DESC'
    );
    res.json({ message: 'Fetch success!', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sliders' });
  }
};

// Delete slider
exports.deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT image_url FROM sliders WHERE id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({ message: 'Slider not found' });
    }

    await deleteFile(rows[0].image_url);
    await pool.query('DELETE FROM sliders WHERE id = $1', [id]);
    res.json({ message: 'Deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete slider' });
  }
};

// Update slider
exports.updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    validateSliderInput({ title, description });

    const { rows } = await pool.query('SELECT image_url FROM sliders WHERE id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({ message: 'Slider not found' });
    }

    let image_url = rows[0].image_url;
    if (req.file) {
      await deleteFile(rows[0].image_url);
      image_url = `/file/slider/${req.file.filename}`;
    }

    await pool.query(
      'UPDATE sliders SET title = $1, description = $2, image_url = $3 WHERE id = $4',
      [title, description || null, image_url, id]
    );

    res.json({ message: 'Slider updated successfully!', data: { id, title, description, image_url } });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update slider' });
  }
};