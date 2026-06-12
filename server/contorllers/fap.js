const pool = require('../config/connect_DB'); // สมมติคุณมีไฟล์เชื่อม PostgreSQL

// ดึง FAQ ทั้งหมด
exports.getAllFaqs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM faqs ORDER BY id ASC');
    res.json({ data: result.rows });
  } catch (err) {
    console.error('Error fetching FAQs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// เพิ่ม FAQ
exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const result = await pool.query(
      'INSERT INTO faqs (question, answer) VALUES ($1, $2) RETURNING *',
      [question, answer]
    );
    res.status(201).json({ data: result.rows[0] });
  } catch (err) {
    console.error('Error creating FAQ:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// แก้ไข FAQ
exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const result = await pool.query(
      'UPDATE faqs SET question = $1, answer = $2 WHERE id = $3 RETURNING *',
      [question, answer, id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'FAQ not found' });
    res.json({ data: result.rows[0] });
  } catch (err) {
    console.error('Error updating FAQ:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ลบ FAQ
exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM faqs WHERE id = $1 RETURNING *', [id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'FAQ not found' });
    res.json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    console.error('Error deleting FAQ:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
