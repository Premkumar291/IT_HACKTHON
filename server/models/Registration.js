const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    yearOfStudy: { type: String, required: true, trim: true },

    members: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          email: { type: String, required: true, trim: true, lowercase: true },
          phone: { type: String, required: true, trim: true },
        },
      ],
      default: [],
    },
    preferredProblem: { type: String, required: true, trim: true, index: true },

    pptFile: {
      originalName: { type: String, default: 'N/A' },
      mimeType: { type: String, default: 'N/A' },
      size: { type: Number, default: 0 },
      fileId: { type: String, default: 'N/A', index: true },
    },

    facultyScore: { type: Number, default: 0 },
    guestScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Combined text index for high-performance searching in admin dashboard
RegistrationSchema.index({
  fullName: 'text',
  email: 'text',
  phone: 'text',
  college: 'text',
  preferredProblem: 'text',
});

RegistrationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Registration', RegistrationSchema);

