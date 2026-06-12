const express = require("express");
const requireAuth = require("../middlewares/authen_c");
const { createApplicants,getApplicants ,getApplicants_manager,confrim_Update_satus,getUnreadApplicantsCount,markApplicantRead,
    InvitedforInterview_Update_satus,   getApplicants_Hr,getUnreadApplicantsCount_Hr,markApplicantRead_Hr



} = require('../contorllers/applicant');
const {managerCheck,authCheck,hrCheck} = require("../middlewares/authCheck");

const upload = require('../middlewares/upload'); // Multer for photo

const router = express.Router();

// Handle CV and photo uploads with Multer
router.post('/applicants', requireAuth, upload, createApplicants);
router.get('/applicants', requireAuth, getApplicants);


router.get('/applicants_manager',authCheck,managerCheck, getApplicants_manager);

router.put('/applicants/status',authCheck, managerCheck, confrim_Update_satus);


router.put('/applicants/unread',authCheck, managerCheck, getUnreadApplicantsCount);
router.put('/applicants/:applicant_id/read',authCheck, managerCheck, markApplicantRead);





// HR routes
router.get('/applicants_hr',authCheck,hrCheck, getApplicants_Hr);

router.put('/applicants/statusbyhr',authCheck, hrCheck, InvitedforInterview_Update_satus);


router.get('/applicants/unreadbyhr',authCheck, hrCheck, getUnreadApplicantsCount_Hr);
router.put('/applicants/:applicant_id/readbyhr',authCheck, hrCheck, markApplicantRead_Hr);







module.exports = router;