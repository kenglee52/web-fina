const db = require('../../config/connect_DB');

exports.getJobPost = async (req, res) => {
  try {
    await db.query('BEGIN');

    // ดึงข้อมูลทั้งหมด
    const query = `
      SELECT jp.post_id, jp.position_id, jp.title, jp.description, jp.quantity, jp.status, 
             jp.start_date, jp.end_date, jp.created_at, p.position_title, d.dept_name
      FROM job_posts jp
      LEFT JOIN positions p ON jp.position_id = p.position_id
      LEFT JOIN departments d ON p.dept_id = d.dept_id
      ORDER BY jp.created_at DESC
    `;
    const result = await db.query(query);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const updatePromises = [];

    for (const post of result.rows) {
      const endDate = new Date(post.end_date);
      endDate.setHours(0, 0, 0, 0);

      // ❌ ถ้า end_date หมดอายุ และยัง open → ปิด
      if (post.status === 'open' && endDate < currentDate) {
        updatePromises.push(
          db.query(
            'UPDATE job_posts SET status = $1 WHERE post_id = $2 RETURNING post_id, status',
            ['closed', post.post_id]
          )
        );
      }

      // ✅ ถ้า end_date ยังไม่หมด แต่ status เป็น closed → เปิดกลับ
      if (post.status === 'closed' && endDate >= currentDate) {
        updatePromises.push(
          db.query(
            'UPDATE job_posts SET status = $1 WHERE post_id = $2 RETURNING post_id, status',
            ['open', post.post_id]
          )
        );
      }
    }

    await Promise.all(updatePromises);

    // ดึงข้อมูลใหม่หลังอัปเดต
    const updatedResult = await db.query(query);
    await db.query('COMMIT');

    res.status(200).json({
      message: 'Job posts retrieved successfully',
      job_posts: updatedResult.rows,
    });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error('Error retrieving job posts:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE job post (HR only)
exports.createJobPost = async (req, res) => {
  const { position_id, title, description, quantity = 1, status = 'open', start_date, end_date } = req.body;
  if (!title || !start_date || !end_date) {
    return res.status(400).json({ message: 'Title, start date, and end date are required' });
  }
  if (title.length > 255) {
    return res.status(400).json({ message: 'Title exceeds 255 characters' });
  }
  if (!['open', 'closed'].includes(status)) {
    return res.status(400).json({ message: 'Status must be "open" or "closed"' });
  }
  if (isNaN(quantity) || quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be a positive integer' });
  }
  if (new Date(end_date) < new Date(start_date)) {
    return res.status(400).json({ message: 'End date cannot be before start date' });
  }

  try {
    // Check if position_id is provided and valid
    if (position_id) {
      const positionQuery = 'SELECT position_id FROM positions WHERE position_id = $1';
      const positionResult = await db.query(positionQuery, [position_id]);
      if (positionResult.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid position ID' });
      }
    }

    // Insert new job post
    const insertQuery = `
      INSERT INTO job_posts (position_id, title, description, quantity, status, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING post_id, position_id, title, description, quantity, status, start_date, end_date, created_at
    `;
    const insertResult = await db.query(insertQuery, [
      position_id || null,
      title.trim(),
      description?.trim() || null,
      quantity,
      status,
      start_date,
      end_date,
    ]);
    res.status(201).json({
      message: 'Job post created successfully',
      job_post: insertResult.rows[0],
    });
  } catch (err) {
    console.error('Error creating job post:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE job post (HR only)
exports.updateJobPost = async (req, res) => {
  const { post_id } = req.params;
  const { position_id, title, description, quantity, status, start_date, end_date } = req.body;
  if (!title || !start_date || !end_date) {
    return res.status(400).json({ message: 'Title, start date, and end date are required' });
  }
  if (title.length > 255) {
    return res.status(400).json({ message: 'Title exceeds 255 characters' });
  }
  if (status && !['open', 'closed'].includes(status)) {
    return res.status(400).json({ message: 'Status must be "open" or "closed"' });
  }
  if (quantity && (isNaN(quantity) || quantity < 1)) {
    return res.status(400).json({ message: 'Quantity must be a positive integer' });
  }
  if (new Date(end_date) < new Date(start_date)) {
    return res.status(400).json({ message: 'End date cannot be before start date' });
  }

  try {
    // Check if post_id exists
    const checkQuery = 'SELECT post_id FROM job_posts WHERE post_id = $1';
    const checkResult = await db.query(checkQuery, [post_id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // Check if position_id is provided and valid
    if (position_id) {
      const positionQuery = 'SELECT position_id FROM positions WHERE position_id = $1';
      const positionResult = await db.query(positionQuery, [position_id]);
      if (positionResult.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid position ID' });
      }
    }

    // Update job post
    const updateQuery = `
      UPDATE job_posts 
      SET position_id = $1, title = $2, description = $3, quantity = $4, status = $5, 
          start_date = $6, end_date = $7
      WHERE post_id = $8
      RETURNING post_id, position_id, title, description, quantity, status, start_date, end_date, created_at
    `;
    const updateResult = await db.query(updateQuery, [
      position_id || null,
      title.trim(),
      description?.trim() || null,
      quantity || 1,
      status || 'open',
      start_date,
      end_date,
      post_id,
    ]);
    res.status(200).json({
      message: 'Job post updated successfully',
      job_post: updateResult.rows[0],
    });
  } catch (err) {
    console.error('Error updating job post:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE job post (HR only)
exports.deleteJobPost = async (req, res) => {
  const { post_id } = req.params;
  try {
    // Check if job post exists
    const checkQuery = 'SELECT post_id FROM job_posts WHERE post_id = $1';
    const checkResult = await db.query(checkQuery, [post_id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // Delete job post (ON DELETE CASCADE handles applicants)
    const deleteQuery = 'DELETE FROM job_posts WHERE post_id = $1';
    const deleteResult = await db.query(deleteQuery, [post_id]);
    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (err) {
    console.error('Error deleting job post:', err);
    res.status(500).json({ message: 'Server error' });
  }
};