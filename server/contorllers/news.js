const pool = require('../config/connect_DB');
const fs = require('fs').promises;
const path = require('path');

// Input validation
const validateNewsInput = (data) => {
  const { title, content, type, summary } = data;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Title is required and must be a non-empty string');
  }
  if (!content || typeof content !== 'string' || content.trim() === '') {
    throw new Error('Content is required and must be a non-empty string');
  }
  if (!type || !['news', 'event'].includes(type)) {
    throw new Error('Type must be either "news" or "event"');
  }
  if (summary && typeof summary !== 'string') {
    throw new Error('Summary must be a string');
  }
};

// Sanitize file path to prevent path traversal
const sanitizeFilePath = (filePath) => {
  const baseDir = path.join(__dirname, '../file/news');
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

// Create news/event
exports.createNews = async (req, res) => {
  try {
    const { title, content, summary, type } = req.body;
    validateNewsInput({ title, content, type, summary });

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const image_url = `/file/news/${req.file.filename}`;
    const { rows } = await pool.query(
      'INSERT INTO news (title, content, summary, image_url, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, content, summary || null, image_url, type]
    );

    res.json({ message: 'News created successfully!', data: rows[0] });
  } catch (err) {
    if (req.file) {
      // Clean up uploaded file on error
      try {
        await deleteFile(path.join(__dirname, '../file/news', req.file.filename));
      } catch (unlinkErr) {
        console.error('Failed to clean up file:', unlinkErr);
      }
    }
    res.status(500).json({ message: 'Failed to create news' });
  }
};

// Get all news/events
exports.getNews = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, content, summary, image_url, type, created_at FROM news ORDER BY created_at DESC'
    );
    res.json({ message: 'Fetch success!', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};

// Delete news/event
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT image_url FROM news WHERE id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({ message: 'News not found' });
    }

    if (rows[0].image_url) {
      await deleteFile(rows[0].image_url);
    }
    await pool.query('DELETE FROM news WHERE id = $1', [id]);
    res.json({ message: 'Deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete news' });
  }
};

// Update news/event
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, summary, type } = req.body;
    validateNewsInput({ title, content, type, summary });

    const { rows } = await pool.query('SELECT image_url FROM news WHERE id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({ message: 'News not found' });
    }

    let image_url = rows[0].image_url;
    if (req.file) {
      if (image_url) {
        await deleteFile(image_url);
      }
      image_url = `/file/news/${req.file.filename}`;
    }

    const { rows: updatedRows } = await pool.query(
      'UPDATE news SET title = $1, content = $2, summary = $3, image_url = $4, type = $5 WHERE id = $6 RETURNING *',
      [title, content, summary || null, image_url, type, id]
    );

    res.json({ message: 'News updated successfully!', data: updatedRows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update news' });
  }
};


exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'SELECT id, title, content, summary, image_url, type, created_at FROM news WHERE id = $1',
      [id]
    );
    if (!rows[0]) {
      return res.status(404).json({ message: 'News/event not found' });
    }
    res.json({ message: 'Fetch success!', data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch news/event' });
  }
};
