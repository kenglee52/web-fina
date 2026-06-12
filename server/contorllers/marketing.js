const fs = require('fs');
const path = require('path');
const pool = require('../config/connect_DB');

// Upload new popup image
exports.uploadpopup = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Save new image
    const file = req.file;
    const filePath = `/file/showpopup/${file.filename}`; // Relative path for DB
    const query = 'INSERT INTO imagepopup(filepath) VALUES($1) RETURNING *';
    const values = [filePath];

    const result = await pool.query(query, values);

    res.status(200).json({
      message: 'Upload success!',
      file: result.rows[0],
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error during upload' });
  }
};

// Fetch all popup images (latest first)
exports.getPopups = async (req, res) => {
  try {
    const query = 'SELECT * FROM imagepopup ORDER BY created_at DESC';
    const result = await pool.query(query);

    res.status(200).json({
      message: 'Fetch success!',
      data: result.rows,
    });
  } catch (err) {
    console.error('Fetch popup error:', err);
    res.status(500).json({ error: 'Server error during fetching popups' });
  }
};

// Delete all popups (files and DB records)
exports.deletePopup = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM imagepopup');
    const popups = result.rows;

    if (popups.length === 0) {
      return res.status(404).json({ message: 'No popup found to delete' });
    }

    // Delete files from folder
    for (const popup of popups) {
      const filePath = path.join(__dirname, '../file/showpopup', path.basename(popup.filepath));
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log('Deleted file:', filePath);
        } catch (deleteErr) {
          console.error('Error deleting file:', deleteErr);
        }
      }
    }

    // Delete records from DB
    await pool.query('DELETE FROM imagepopup');

    res.status(200).json({ message: 'Popup deleted successfully' });
  } catch (err) {
    console.error('Delete popup error:', err);
    res.status(500).json({ error: 'Server error during popup deletion' });
  }
};