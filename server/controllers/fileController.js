const { getBucket, toObjectId } = require('../db/gridfs');

exports.getFile = async (req, res) => {
  try {
    const id = toObjectId(req.params.fileId);
    if (!id) return res.status(400).json({ error: 'Invalid file id' });

    const bucket = getBucket();
    const files = await bucket.find({ _id: id }).limit(1).toArray();
    const file = files[0];
    if (!file) return res.status(404).json({ error: 'File not found' });

    res.setHeader('Content-Type', file.contentType || 'application/octet-stream');
    res.setHeader('Content-Length', String(file.length || 0));
    // inline so admin can view in browser
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file.filename)}"`);

    const stream = bucket.openDownloadStream(id);
    stream.on('error', (e) => {
      console.error('GridFS download error:', e);
      if (!res.headersSent) res.status(500).end();
      else res.end();
    });
    stream.pipe(res);
  } catch (e) {
    console.error('Get file error:', e);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
};

