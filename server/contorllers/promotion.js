const pool = require('../config/connect_DB');
const fs = require('fs').promises;
const path = require('path');

// Input validation
const validatePromotionInput = (data) => {
  const { title, description, start_date, end_date, status } = data;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Title is required and must be a non-empty string');
  }
  if (description && typeof description !== 'string') {
    throw new Error('Description must be a string');
  }
  if (start_date && isNaN(Date.parse(start_date))) {
    throw new Error('Start date must be a valid date');
  }
  if (end_date && isNaN(Date.parse(end_date))) {
    throw new Error('End date must be a valid date');
  }
  if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
    throw new Error('End date must be after start date');
  }
  if (status && !['active', 'expired', 'hidden'].includes(status)) {
    throw new Error('Status must be one of: active, expired, hidden');
  }
};

// Sanitize file path to prevent path traversal
const sanitizeFilePath = (filePath) => {
  const baseDir = path.join(__dirname, '../file/promotion');
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

// Create promotion
exports.createPromotion = async (req, res) => {
  try {
    const { title, description, start_date, end_date, status } = req.body;
    validatePromotionInput({ title, description, start_date, end_date, status });

    let image_url = null;
    if (req.file) {
      image_url = `/file/promotion/${req.file.filename}`;
    }

    const { rows } = await pool.query(
      'INSERT INTO promotions (title, description, start_date, end_date, image_url, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description || null, start_date || null, end_date || null, image_url, status || 'active']
    );

    res.json({ message: 'Promotion created successfully!', data: rows[0] });
  } catch (err) {
    if (req.file) {
      try {
        await deleteFile(path.join(__dirname, '../file/promotion', req.file.filename));
      } catch (unlinkErr) {
        console.error('Failed to clean up file:', unlinkErr);
      }
    }
    res.status(400).json({ message: err.message || 'Failed to create promotion' });
  }
};
const updateExpiredPromotions = async () => {
  try {
    const query = `
      UPDATE promotions
      SET status = 'expired'
      WHERE end_date < CURRENT_DATE
        AND status = 'active'
    `;
    await pool.query(query);
    console.log("Expired promotions updated successfully");
  } catch (error) {
    console.error("Error updating expired promotions:", error);
  }
};

// Get all promotions
exports.getPromotions = async (req, res) => {
  try {

    
    const { rows } = await pool.query(
      'SELECT id, title, description, start_date, end_date, image_url, status, created_at FROM promotions ORDER BY created_at DESC'
    );
    res.json({ message: 'Fetch success!', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch promotions' });
  }
};

// Get promotion by ID
exports.getPromotionById = async (req, res) => {
  try {
    const { id } = req.params;
     await updateExpiredPromotions();
    const { rows } = await pool.query(
      'SELECT id, title, description, start_date, end_date, image_url, status, created_at FROM promotions WHERE id = $1',
      [id]
    );
    if (!rows[0]) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.json({ message: 'Fetch success!', data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch promotion' });
  }
};

// Delete promotion
exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT image_url FROM promotions WHERE id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    if (rows[0].image_url) {
      await deleteFile(rows[0].image_url);
    }
    await pool.query('DELETE FROM promotions WHERE id = $1', [id]);
    res.json({ message: 'Deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete promotion' });
  }
};

// Update promotion
exports.updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, start_date, end_date, status } = req.body;
    validatePromotionInput({ title, description, start_date, end_date, status });

    const { rows } = await pool.query('SELECT image_url FROM promotions WHERE id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    let image_url = rows[0].image_url;
    if (req.file) {
      if (image_url) {
        await deleteFile(image_url);
      }
      image_url = `/file/promotion/${req.file.filename}`;
    }

    const { rows: updatedRows } = await pool.query(
      'UPDATE promotions SET title = $1, description = $2, start_date = $3, end_date = $4, image_url = $5, status = $6 WHERE id = $7 RETURNING *',
      [title, description || null, start_date || null, end_date || null, image_url, status || 'active', id]
    );

    res.json({ message: 'Promotion updated successfully!', data: updatedRows[0] });
  } catch (err) {
    if (req.file) {
      try {
        await deleteFile(path.join(__dirname, '../file/promotion', req.file.filename));
      } catch (unlinkErr) {
        console.error('Failed to clean up file:', unlinkErr);
      }
    }
    res.status(400).json({ message: err.message || 'Failed to update promotion' });
  }
};