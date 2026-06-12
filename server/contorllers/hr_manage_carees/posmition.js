const db = require('../../config/connect_DB');

// GET all positions
exports.getPosition = async (req, res) => {
  try {
    const query = `
      SELECT p.position_id, p.dept_id, p.position_title, p.is_open, d.dept_name 
      FROM positions p
      JOIN departments d ON p.dept_id = d.dept_id
      ORDER BY p.position_title
    `;
    const result = await db.query(query);
    res.status(200).json({
      message: 'Positions retrieved successfully',
      positions: result.rows,
    });
  } catch (err) {
    console.error('Error retrieving positions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE position
exports.createPosition = async (req, res) => {
  const { dept_id, position_title, is_open = true } = req.body;
  if (!dept_id || !position_title) {
    return res.status(400).json({ message: 'Department ID and position title are required' });
  }
  const trimmedTitle = position_title.trim();
  if (trimmedTitle.length > 100) {
    return res.status(400).json({ message: 'Position title exceeds 100 characters' });
  }

  try {
    // Check if dept_id exists
    const deptQuery = 'SELECT dept_id FROM departments WHERE dept_id = $1';
    const deptResult = await db.query(deptQuery, [dept_id]);
    if (deptResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    // Insert new position
    const insertQuery = `
      INSERT INTO positions (dept_id, position_title, is_open) 
      VALUES ($1, $2, $3) 
      RETURNING position_id, dept_id, position_title, is_open
    `;
    const insertResult = await db.query(insertQuery, [dept_id, trimmedTitle, is_open]);
    res.status(201).json({
      message: 'Position created successfully',
      position: insertResult.rows[0],
    });
  } catch (err) {
    console.error('Error creating position:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE position
exports.updatePosition = async (req, res) => {
  const { position_id } = req.params;
  const { dept_id, position_title, is_open } = req.body;
  if (!dept_id || !position_title) {
    return res.status(400).json({ message: 'Department ID and position title are required' });
  }
  const trimmedTitle = position_title.trim();
  if (trimmedTitle.length > 100) {
    return res.status(400).json({ message: 'Position title exceeds 100 characters' });
  }

  try {
    // Check if dept_id exists
    const deptQuery = 'SELECT dept_id FROM departments WHERE dept_id = $1';
    const deptResult = await db.query(deptQuery, [dept_id]);
    if (deptResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    // Update position
    const updateQuery = `
      UPDATE positions 
      SET dept_id = $1, position_title = $2, is_open = $3 
      WHERE position_id = $4 
      RETURNING position_id, dept_id, position_title, is_open
    `;
    const updateResult = await db.query(updateQuery, [dept_id, trimmedTitle, is_open ?? true, position_id]);
    if (updateResult.rows.length === 0) {
      return res.status(404).json({ message: 'Position not found' });
    }
    res.status(200).json({
      message: 'Position updated successfully',
      position: updateResult.rows[0],
    });
  } catch (err) {
    console.error('Error updating position:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE position
exports.deletePosition = async (req, res) => {
  const { position_id } = req.params;
  try {
    // Check if position exists
    const checkQuery = 'SELECT position_id FROM positions WHERE position_id = $1';
    const checkResult = await db.query(checkQuery, [position_id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Position not found' });
    }

    // Attempt to delete
    const deleteQuery = 'DELETE FROM positions WHERE position_id = $1';
    const deleteResult = await db.query(deleteQuery, [position_id]);
    if (deleteResult.rowCount === 0) {
      return res.status(400).json({ message: 'Cannot delete position due to existing applicants' });
    }
    res.status(200).json({ message: 'Position deleted successfully' });
  } catch (err) {
    console.error('Error deleting position:', err);
    if (err.code === '23503') { // PostgreSQL foreign key violation
      return res.status(400).json({ message: 'Cannot delete position because it is referenced by applicants' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};