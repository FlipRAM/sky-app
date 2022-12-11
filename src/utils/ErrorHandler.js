module.exports = class ErrorHandler extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}