const testServ = require('../services/testService');

const test = async (req, res, _next) => {
  const message = await testServ.test();
  return res.status(200).json({ message });
}

module.exports = { test };
