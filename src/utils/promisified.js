const util = require('util');
const bcrypt = require('bcryptjs');

module.exports = {
    aHash: util.promisify(bcrypt.hash),
    cHash: util.promisify(bcrypt.compare),
}