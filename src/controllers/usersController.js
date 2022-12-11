const StatusCodes = require('http-status-codes');
const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  try {
    const createdUser = await userService.create(req.body)
    return res.status(StatusCodes.CREATED).json(createdUser);
  } catch(err) {
    next(err);
  }
}

const sign = async (req, res, next) => {
  try {
    const user = await userService.sign(req.body)
    return res.status(StatusCodes.OK).json(user);
  } catch(err) {
    next(err);
  }
}

const searchUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = await userService.checkStatus(token)
    return res.status(StatusCodes.OK).json(user);
  } catch(err) {
    next(err)
  }
}

module.exports = { createUser, sign, searchUser };
