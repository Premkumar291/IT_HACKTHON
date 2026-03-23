const multer = require('multer');

function fileFilter(req, file, cb) {
  if (file.fieldname === 'pptFile') {
    const ok =
      file.mimetype === 'application/pdf' ||
      file.originalname.toLowerCase().endsWith('.pdf');
    return cb(ok ? null : new Error('Invalid PPT PDF file type'), ok);
  }

  if (file.fieldname === 'paymentScreenshot') {
    const ok =
      file.mimetype.startsWith('image/') ||
      file.mimetype === 'application/pdf' ||
      file.originalname.toLowerCase().endsWith('.pdf');
    return cb(ok ? null : new Error('Invalid payment screenshot type'), ok);
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

