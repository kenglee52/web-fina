const db = require('../../config/connect_DB');

// GET all departments
exports.getdepartment = async (req, res) => {
  try {
    const query = 'SELECT dept_id, dept_name FROM departments ORDER BY dept_name';
    const result = await db.query(query);
    res.status(200).json({
      message: 'Departments retrieved successfully',
      departments: result.rows,
    });
  } catch (err) {
    console.error('Error retrieving departments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE department
exports.createdepartment = async (req, res) => {
  const { dept_name } = req.body;
  if (!dept_name) {
    return res.status(400).json({ message: 'Department name is required' });
  }
  const trimmedName = dept_name.trim();
  if (trimmedName.length > 100) {
    return res.status(400).json({ message: 'Department name exceeds 100 characters' });
  }

  try {
    // Check for duplicate dept_name
    const checkQuery = 'SELECT dept_id FROM departments WHERE dept_name = $1';
    const checkResult = await db.query(checkQuery, [trimmedName]);
    if (checkResult.rows.length > 0) {
      return res.status(409).json({ message: 'Department name already exists' });
    }

    // Insert new department
    const insertQuery = 'INSERT INTO departments (dept_name) VALUES ($1) RETURNING dept_id, dept_name';
    const insertResult = await db.query(insertQuery, [trimmedName]);
    res.status(201).json({
      message: 'Department created successfully',
      department: insertResult.rows[0],
    });
  } catch (err) {
    console.error('Error creating department:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE department
exports.updatedepartment = async (req, res) => {
  const { dept_id } = req.params;
  const { dept_name } = req.body;
  if (!dept_name) {
    return res.status(400).json({ message: 'Department name is required' });
  }
  const trimmedName = dept_name.trim();
  if (trimmedName.length > 100) {
    return res.status(400).json({ message: 'Department name exceeds 100 characters' });
  }

  try {
    // Check for duplicate dept_name (excluding current dept_id)
    const checkQuery = 'SELECT dept_id FROM departments WHERE dept_name = $1 AND dept_id != $2';
    const checkResult = await db.query(checkQuery, [trimmedName, dept_id]);
    if (checkResult.rows.length > 0) {
      return res.status(409).json({ message: 'Department name already exists' });
    }

    // Update department
    const updateQuery = 'UPDATE departments SET dept_name = $1 WHERE dept_id = $2 RETURNING dept_id, dept_name';
    const updateResult = await db.query(updateQuery, [trimmedName, dept_id]);
    if (updateResult.rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({
      message: 'Department updated successfully',
      department: updateResult.rows[0],
    });
  } catch (err) {
    console.error('Error updating department:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE department
exports.deletedepartment = async (req, res) => {
  const { dept_id } = req.params;
  try {
    // Check if department exists
    const checkQuery = 'SELECT dept_id FROM departments WHERE dept_id = $1';
    const checkResult = await db.query(checkQuery, [dept_id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Attempt to delete (will fail if referenced by positions due to ON DELETE RESTRICT)
    const deleteQuery = 'DELETE FROM departments WHERE dept_id = $1';
    const deleteResult = await db.query(deleteQuery, [dept_id]);
    if (deleteResult.rowCount === 0) {
      return res.status(400).json({ message: 'Cannot delete department due to existing positions' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (err) {
    console.error('Error deleting department:', err);
    if (err.code === '23503') { // PostgreSQL foreign key violation
      return res.status(400).json({ message: 'Cannot delete department because it is referenced by positions' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};