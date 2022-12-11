const bcrypt = require('bcrypt');

const makeHash = async (password) => {
  const hashed = bcrypt
    .hash(password, 10)
    .catch(err => console.error(err.message))
  return hashed;
}

const validateUser = async (password, hash) => {
    const res = bcrypt
      .compare(password, hash)
      .catch(err => console.error(err.message))       
    return res; 
}

module.exports = { makeHash, validateUser };
