const errorMiddleware = async (err, _req, res, _next) => {
  const { status, message } = err;

  if (!status) {
    return res.status(500).json({ message: 'Server Error' });
  }
  return res.status(status).json({ message });
};

module.exports = errorMiddleware;