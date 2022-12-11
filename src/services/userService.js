require('dotenv').config();
const StatusCodes = require('http-status-codes');
const User = require('../models/user');
const ErrorHandler = require('../utils/ErrorHandler');
const makeToken = require('../utils/jwt');
const { makeHash, validateUser } = require('../utils/passwordHash');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const create = async (userObj) => {
  const emailInvalid = await User.find({email: userObj.email});

  
  if(emailInvalid.length === 0) {
    try {
      const passHash = await makeHash(userObj.senha);
      const token = makeToken({senha: passHash, ...userObj});
      const userFinal = {...userObj, token, senha: passHash};
      const createdUser = await User.create(userFinal);
      return createdUser;
    } catch(err) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'Failed to create User');
    }
  } else {
    throw new ErrorHandler(StatusCodes.CONFLICT, 'Email já existente');
  }
}

const sign = async (userObj) => {
  const userExists = await User.findOne({email: userObj.email});
  console.log(userExists);
  
  if(userExists.length === 0) {
    throw new ErrorHandler(StatusCodes.NOT_FOUND, 'Usuário e/ou senha inválidos');
  } else {
    const passHash = await validateUser(userObj.senha, userExists.senha);
    if (passHash === true) {
      await User.updateOne({ email: userObj.email }, { $set: {
        ultimo_login: new Date()
      }})
      const userCorrect = await User.find({ email: userObj.email });
      return userCorrect;
    } else {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'Usuário e/ou senha inválidos');
    }
  }
}

const checkStatus = async (token) => {
  try {
    const { data } = jwt.verify(token, secret);
    if (data) {
      const userExists = await User.findOne({email: data.email});
      const lastLoginDate = userExists['ultimo_login'].toDateString();
      const lastLogin = userExists['ultimo_login'].getMinutes();
      const today = new Date().toDateString();
      const todayMinutes = new Date().getMinutes();
      if (lastLoginDate === today && todayMinutes - lastLogin <= 30) {
        await User.updateOne({ email: data.email }, { $set: {
          ultimo_login: new Date()
        }})
        const userCorrect = await User.find({ email: data.email });
        return userCorrect;
      } if (lastLoginDate !== today || todayMinutes - lastLogin > 30) {
        throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Sessão inválida');
      }
    }
  } catch(err) {
    throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Não autorizado');
  }
}

module.exports = { create, sign, checkStatus };
