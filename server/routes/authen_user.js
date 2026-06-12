const express = require('express');
const router = express.Router();
const { register, login, currentUser } = require('../contorllers/authen_user');
const { authCheck, hrCheck } = require('../middlewares/authCheck');

router.post('/register', register);
router.post('/login', login);

router.post('/current-user', authCheck, currentUser);


module.exports = router;