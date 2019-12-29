const crypto = require('crypto');

function generateId(bytes=8) {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateId;