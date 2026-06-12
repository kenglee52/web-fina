const express = require('express');
const router = express.Router();
const { authCheck, hrCheck } = require('../middlewares/authCheck');
const {
  getdepartment,
  createdepartment,
  updatedepartment,
  deletedepartment,
  
} = require('../contorllers/hr_manage_carees/department');
const {
 getPosition,
  createPosition,
  updatePosition,
  deletePosition,
} = require('../contorllers/hr_manage_carees/posmition');
const {
 getJobPost,
  createJobPost,
  updateJobPost,
  deleteJobPost,
} = require('../contorllers/hr_manage_carees/job_posts');

// Department routes (HR only)
router.get('/department', getdepartment);
router.post('/department', authCheck, hrCheck, createdepartment);
router.put('/department/:dept_id', authCheck, hrCheck, updatedepartment);
router.delete('/department/:dept_id', authCheck, hrCheck, deletedepartment);



// Position routes (HR only)
router.get('/position', getPosition);
router.post('/position', authCheck, hrCheck, createPosition);
router.put('/position/:position_id', authCheck, hrCheck, updatePosition);
router.delete('/position/:position_id', authCheck, hrCheck, deletePosition);

//job_post(HR only)
router.get('/jobpost', getJobPost); // Public
router.post('/jobpost', authCheck, hrCheck, createJobPost);
router.put('/jobpost/:post_id', authCheck, hrCheck, updateJobPost);
router.delete('/jobpost/:post_id', authCheck, hrCheck, deleteJobPost);

module.exports = router;