const mongoose = require('mongoose');
const { GridFSBucket, ObjectId } = require('mongodb');

function getBucket() {
  const db = mongoose.connection?.db;
  if (!db) {
    throw new Error('MongoDB connection is not ready');
  }
  return new GridFSBucket(db, { bucketName: 'uploads' });
}

function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

module.exports = { getBucket, toObjectId };

