const mongoose = require('mongoose');
const Registration = require('../models/Registration');

function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

exports.getRegistrationStats = async (req, res) => {
  try {
    const total = await Registration.countDocuments({});
    return res.json({ total });
  } catch (err) {
    console.error('Admin stats error:', err);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

exports.listRegistrations = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '25', 10), 1), 200);
    const q = (req.query.q || '').toString().trim();

    const filter = {};

    if (q) {
      filter.$text = { $search: q };
    }

    const [items, total] = await Promise.all([
      Registration.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Registration.countDocuments(filter),
    ]);

    return res.json({
      items,
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    });
  } catch (err) {
    console.error('Admin list registrations error:', err);
    return res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const deleted = await Registration.findByIdAndDelete(id).lean();
    if (!deleted) {
      return res.status(404).json({ error: 'Not found' });
    }

    // best-effort: delete associated GridFS files
    try {
      const { getBucket, toObjectId } = require('../db/gridfs');
      const bucket = getBucket();
      const ids = [
        toObjectId(deleted?.pptFile?.fileId),
      ].filter(Boolean);
      await Promise.all(ids.map((oid) => bucket.delete(oid).catch(() => undefined)));
    } catch (e) {
      console.warn('Failed to delete GridFS files:', e?.message || e);
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('Admin delete registration error:', err);
    return res.status(500).json({ error: 'Failed to delete registration' });
  }
};

