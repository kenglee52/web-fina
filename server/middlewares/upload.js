const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure folders exist
const cvDir = 'file/cv/';
const photoDir = 'file/photo/';
if (!fs.existsSync(cvDir)) fs.mkdirSync(cvDir, { recursive: true });
if (!fs.existsSync(photoDir)) fs.mkdirSync(photoDir, { recursive: true });

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images and documents (jpeg, jpg, png, pdf, doc, docx) are allowed'));
  }
};

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'cv') {
      cb(null, cvDir);
    } else if (file.fieldname === 'photo') {
      cb(null, photoDir);
    } else {
      cb(new Error('Invalid fieldname'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Combined Multer
const upload = multer({ storage, fileFilter }).fields([
  { name: 'cv', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
]);

module.exports = upload;
