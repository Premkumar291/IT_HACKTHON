const multer = require('multer');

function fileFilter(req, file, cb) {
  if (file.fieldname === 'pptFile') {
    const ok =
      file.mimetype === 'application/vnd.ms-powerpoint' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      file.originalname.toLowerCase().endsWith('.ppt') ||
      file.originalname.toLowerCase().endsWith('.pptx');
    return cb(ok ? null : new Error('Only PPT/PPTX files are accepted'), ok);
  }

  return cb(null, true);
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },
});

module.exports = { upload };

