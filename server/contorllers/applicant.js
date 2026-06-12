const db = require('../config/connect_DB');

exports.createApplicants = async (req, res) => {
  const client = await db.connect();
  try {
    const userId = req.auth.userId; // From Clerk middleware
    const {
      applied_position_id,
      fullname,
      login_email,
      expected_salary,
      date_of_birth,
      nationality,
      marital_status,
      spouse_name,
      spouse_occupation,
      spouse_workplace,
      number_of_children,
      phone_number,
      email,
      current_address,
      language_skills,
      computer_skills,
      emergency_name,
      emergency_relationship,
      emergency_phone,
      emergency_address,
      educations: educationsRaw, // Renamed to avoid conflict
    } = req.body;

    // Parse educations from JSON string
    let educations;
    try {
      educations = educationsRaw ? JSON.parse(educationsRaw) : [];
    } catch (parseError) {
      return res.status(400).json({ error: 'Invalid educations format: must be a valid JSON array' });
    }

    // Validate required fields
    if (!applied_position_id || !fullname || !login_email) {
      return res.status(400).json({ error: 'Missing required fields: applied_position_id, fullname, login_email' });
    }

    // Validate educations (require at least one record, configurable)
    const requireEducation = true; // Set to false if educations are optional
    if (requireEducation && (!Array.isArray(educations) || educations.length === 0)) {
      return res.status(400).json({ error: 'At least one education record is required' });
    }

    // Validate applied_position_id exists in positions table
    const positionCheck = await client.query('SELECT position_id FROM positions WHERE position_id = $1', [applied_position_id]);
    if (positionCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid applied_position_id' });
    }

    // Validate education records
    if (educations && educations.length > 0) {
      for (const edu of educations) {
        if (!edu.qualification || !edu.institution_name) {
          return res.status(400).json({ error: 'Each education record must include qualification and institution_name' });
        }
        // Validate graduation_year (e.g., 1900-2100) and gpa (e.g., 0-4.0)
        if (edu.graduation_year && (edu.graduation_year < 1900 || edu.graduation_year > 2100)) {
          return res.status(400).json({ error: 'Invalid graduation_year' });
        }
        if (edu.gpa && (edu.gpa < 0 || edu.gpa > 4.0)) {
          return res.status(400).json({ error: 'Invalid gpa' });
        }
      }
    }

    await client.query('BEGIN'); // Start transaction

    // Insert into applicants table
    const applicantQuery = `
      INSERT INTO applicants (
        applied_position_id, fullname, login_email, expected_salary, date_of_birth,
        nationality, marital_status, spouse_name, spouse_occupation, spouse_workplace,
        number_of_children, phone_number, email, current_address, language_skills,
        computer_skills, application_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING applicant_id
    `;
    const applicantValues = [
      applied_position_id,
      fullname,
      login_email,
      expected_salary || null,
      date_of_birth || null,
      nationality || null,
      marital_status || null,
      spouse_name || null,
      spouse_occupation || null,
      spouse_workplace || null,
      number_of_children || 0,
      phone_number || null,
      email || null,
      current_address || null,
      language_skills || null,
      computer_skills || null,
      'Pending',
    ];
    const applicantResult = await client.query(applicantQuery, applicantValues);
    const applicant_id = applicantResult.rows[0].applicant_id;
if (!req.files?.cv || !req.files?.photo) {
  return res.status(400).json({ error: 'CV and Photo are required' });
}

const cv_path = `/file/cv/${req.files.cv[0].filename}`;
const photo_path = `/file/photo/${req.files.photo[0].filename}`;
    // Insert into applicant_details table

    if (emergency_name || emergency_relationship || emergency_phone || emergency_address || cv_path || photo_path) {
      const detailsQuery = `
        INSERT INTO applicant_details (
          applicant_id, emergency_name, emergency_relationship, emergency_phone, emergency_address,
          cv_path, photo_path
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const detailsValues = [
        applicant_id,
        emergency_name || null,
        emergency_relationship || null,
        emergency_phone || null,
        emergency_address || null,
        cv_path,
        photo_path,
      ];
      await client.query(detailsQuery, detailsValues);
    }

    // Insert into educations table (if provided)
    if (educations && educations.length > 0) {
      const educationQuery = `
        INSERT INTO educations (
          applicant_id, qualification, major, institution_name, graduation_year, gpa
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `;
      for (const edu of educations) {
        const educationValues = [
          applicant_id,
          edu.qualification,
          edu.major || null,
          edu.institution_name,
          edu.graduation_year || null,
          edu.gpa || null,
        ];
        await client.query(educationQuery, educationValues);
      }
    }

    await client.query('COMMIT'); // Commit transaction

    // Log success
    console.log('✅ Applicant Created:', { applicant_id, userId, fullname, login_email, educations });

    // Return response
    res.status(201).json({
      message: 'Applicant saved successfully',
      applicant_id,
      fullname,
      login_email,
      userId,
      cv_path,
      photo_path,
      educations,
    });
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error('❌ Error creating applicant:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};


exports.getApplicants = async (req, res) => {
  const client = await db.connect();
  try {
    const userId = req.auth.userId; // From Clerk middleware
    const { login_email } = req.query;

    // Validate input
    if (!login_email) {
      return res.status(400).json({ error: 'login_email is required' });
    }

    // Query to fetch applicants with related details and educations
   const query = `
  SELECT 
    a.applicant_id,
    a.applied_position_id,
    p.position_title,  -- ✅ ดึงชื่อจากตาราง positions
    a.fullname,
    a.created_at,
    a.login_email,
    a.expected_salary,
    a.date_of_birth,
    a.nationality,
    a.marital_status,
    a.spouse_name,
    a.spouse_occupation,
    a.spouse_workplace,
    a.number_of_children,
    a.phone_number,
    a.email,
    a.current_address,
    a.language_skills,
    a.computer_skills,
    a.application_status,
    ad.emergency_name,
    ad.emergency_relationship,
    ad.emergency_phone,
    ad.emergency_address,
    ad.cv_path,
    ad.photo_path,
    COALESCE(
      (
        SELECT json_agg(
          json_build_object(
            'qualification', e.qualification,
            'major', e.major,
            'institution_name', e.institution_name,
            'graduation_year', e.graduation_year,
            'gpa', e.gpa
          )
        )
        FROM educations e
        WHERE e.applicant_id = a.applicant_id
      ),
      '[]'::json
    ) AS educations
  FROM applicants a
  LEFT JOIN applicant_details ad ON a.applicant_id = ad.applicant_id
  LEFT JOIN positions p ON a.applied_position_id = p.position_id   -- ✅ join เพิ่มตรงนี้
  WHERE a.login_email = $1
`;

    const result = await client.query(query, [login_email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No applicants found for the provided login_email' });
    }

   
    // Return response
    res.status(200).json({
      message: 'Applicants retrieved successfully',
      applicants: result.rows,
    });
  } catch (error) {
    console.error('❌ Error retrieving applicants:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};
exports.getApplicants_manager = async (req, res) => {
  const client = await db.connect();
  try {
    // Get department from query parameter
    const department = req.query.department;
    

    const query = `
      SELECT 
        a.applicant_id,
        a.fullname,
        a.login_email,
        a.email,
        a.phone_number,
        a.expected_salary,
        a.date_of_birth,
        a.nationality,
        a.marital_status,
        a.spouse_name,
        a.spouse_occupation,
        a.spouse_workplace,
        a.number_of_children,
        a.current_address,
        a.language_skills,
        a.computer_skills,
        a.application_status,
        a.manager_read,
        p.position_title,
        d.dept_name,
        ad.emergency_name,
        ad.emergency_relationship,
        ad.emergency_phone,
        ad.emergency_address,
        ad.cv_path,
        ad.photo_path,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'qualification', e.qualification,
                'major', e.major,
                'institution_name', e.institution_name,
                'graduation_year', e.graduation_year,
                'gpa', e.gpa
              )
            )
            FROM educations e
            WHERE e.applicant_id = a.applicant_id
          ),
          '[]'::json
        ) AS educations
      FROM applicants a
      LEFT JOIN positions p ON a.applied_position_id = p.position_id
      LEFT JOIN departments d ON p.dept_id = d.dept_id
      LEFT JOIN applicant_details ad ON a.applicant_id = ad.applicant_id
      WHERE d.dept_name = $1
      ORDER BY a.applicant_id DESC
    `;

    const result = await client.query(query, [department]);

    console.log(`✅ ${department} Applicants Retrieved:`, { count: result.rows.length });

    res.status(200).json({
      message: `${department} Applicants retrieved successfully`,
      applicants: result.rows,
    });
  } catch (error) {
    console.error(`❌ Error retrieving ${req.query.department || 'unknown'} applicants:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};
exports.confrim_Update_satus = async (req, res) => {
  const client = await db.connect();
  try {
    const { admin_id } = req.user; // <-- แก้ตรงนี้
    const { applicant_id, application_status } = req.body;

    // Validate input
    if (!applicant_id || !application_status) {
      return res.status(400).json({ error: 'applicant_id and application_status are required' });
    }

    // Validate status value
    const validStatuses = ['Pending', 'Approved', 'Rejected', 'In Review'];
    if (!validStatuses.includes(application_status)) {
      return res.status(400).json({ error: 'Invalid application_status. Must be one of: Pending, Approved, Rejected, In Review' });
    }

   
    await client.query('BEGIN'); // Start transaction

    // Update application status
    const updateQuery = `
      UPDATE applicants 
      SET application_status = $1 
      WHERE applicant_id = $2 
      RETURNING applicant_id, application_status
    `;
    const updateResult = await client.query(updateQuery, [application_status, applicant_id]);

    await client.query('COMMIT'); // Commit transaction

    console.log('✅ Application Status Updated:', { applicant_id, application_status, admin_id });

    res.status(200).json({
      message: 'Application status updated successfully',
      applicant_id: updateResult.rows[0].applicant_id,
      application_status: updateResult.rows[0].application_status,
    });
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error('❌ Error updating application status:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};


// controllers/applicants.js
exports.getUnreadApplicantsCount = async (req, res) => {
  const client = await db.connect();
  try {
    const department = req.query.department;
   

    const query = `
      SELECT COUNT(*) 
      FROM applicants a
      LEFT JOIN positions p ON a.applied_position_id = p.position_id
      LEFT JOIN departments d ON p.dept_id = d.dept_id
      WHERE a.manager_read = false AND d.dept_name = $1
    `;

    const result = await client.query(query, [department]);
    const unreadCount = parseInt(result.rows[0].count, 10);

    console.log(`✅ Unread count for ${department}:`, { unreadCount });

    res.status(200).json({
      message: `Unread count for ${department} retrieved successfully`,
      unreadCount,
    });
  } catch (error) {
    console.error(`❌ Error retrieving unread count for ${req.query.department || 'unknown'}:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};

// controller: mark applicant as read
exports.markApplicantRead = async (req, res) => {
  const client = await db.connect();
  try {
    const { applicant_id } = req.params;
    await client.query(
      'UPDATE applicants SET manager_read = true WHERE applicant_id = $1',
      [applicant_id]
    );
    res.status(200).json({ message: 'Marked as read' });
  } catch (err) {
    console.error('Error marking applicant as read:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
};









exports.getUnreadApplicantsCount_Hr = async (req, res) => {
  const client = await db.connect();
  try {
    const query = `
      SELECT COUNT(*) 
      FROM applicants a
      WHERE a.hr_read = false
    `;
    const result = await client.query(query);
    const unreadCount = parseInt(result.rows[0].count, 10);

    console.log(`✅ Unread Applicants Count Retrieved:`, { unreadCount });

    res.status(200).json({
      message: 'Unread count retrieved successfully',
      unreadCount,
    });
  } catch (error) {
    console.error(`❌ Error retrieving unread count:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};


// controller: mark applicant as read
exports.markApplicantRead_Hr = async (req, res) => {
  const client = await db.connect();
  try {
    const { applicant_id } = req.params;
    await client.query(
      'UPDATE applicants SET hr_read = true WHERE applicant_id = $1',
      [applicant_id]
    );
    res.status(200).json({ message: 'Marked as read' });
  } catch (err) {
    console.error('Error marking applicant as read:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
};
exports.InvitedforInterview_Update_satus = async (req, res) => {
  const client = await db.connect();
  try {
    const { admin_id } = req.user; // <-- แก้ตรงนี้
    const { applicant_id, application_status } = req.body;

    // Validate input
    if (!applicant_id || !application_status) {
      return res.status(400).json({ error: 'applicant_id and application_status are required' });
    }

    // Validate status value
    const validStatuses = [ 'Invited_for_Interview'];
    if (!validStatuses.includes(application_status)) {
      return res.status(400).json({ error: 'Invalid application_status. Must be one of:Invited_for_Interview' });
    }

   
    await client.query('BEGIN'); // Start transaction

    // Update application status
    const updateQuery = `
      UPDATE applicants 
      SET application_status = $1 
      WHERE applicant_id = $2 
      RETURNING applicant_id, application_status
    `;
    const updateResult = await client.query(updateQuery, [application_status, applicant_id]);

    await client.query('COMMIT'); // Commit transaction

    console.log('✅ Application Status Updated:', { applicant_id, application_status, admin_id });

    res.status(200).json({
      message: 'Application status updated successfully',
      applicant_id: updateResult.rows[0].applicant_id,
      application_status: updateResult.rows[0].application_status,
    });
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error('❌ Error updating application status:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};


exports.getApplicants_Hr = async (req, res) => {
  const client = await db.connect();
  try {
    const query = `
      SELECT 
        a.applicant_id,
        a.fullname,
        a.login_email,
        a.email,
        a.phone_number,
        a.expected_salary,
        a.date_of_birth,
        a.nationality,
        a.marital_status,
        a.spouse_name,
        a.spouse_occupation,
        a.spouse_workplace,
        a.number_of_children,
        a.current_address,
        a.language_skills,
        a.computer_skills,
        a.application_status,
        a.hr_read,
        a.manager_read,
        a.created_at,
        p.position_title,
        d.dept_name,
        ad.emergency_name,
        ad.emergency_relationship,
        ad.emergency_phone,
        ad.emergency_address,
        ad.cv_path,
        ad.photo_path,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'qualification', e.qualification,
                'major', e.major,
                'institution_name', e.institution_name,
                'graduation_year', e.graduation_year,
                'gpa', e.gpa
              )
            )
            FROM educations e
            WHERE e.applicant_id = a.applicant_id
          ),
          '[]'::json
        ) AS educations
      FROM applicants a
      LEFT JOIN positions p ON a.applied_position_id = p.position_id
      LEFT JOIN departments d ON p.dept_id = d.dept_id
      LEFT JOIN applicant_details ad ON a.applicant_id = ad.applicant_id
      ORDER BY a.applicant_id DESC
    `;

    const result = await client.query(query);

    console.log(`✅ All Applicants Retrieved:`, { count: result.rows.length });

    res.status(200).json({
      message: `All Applicants retrieved successfully`,
      applicants: result.rows,
    });
  } catch (error) {
    console.error(`❌ Error retrieving applicants:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};
