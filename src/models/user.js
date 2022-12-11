const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefones: [{ numero: String, ddd: String }],
  data_criacao: {
    type: Date
  },
  data_atualizacao: {
    type: Date
  },
  ultimo_login: {
    type: Date
  },
  token: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.data_atualizacao = now;
  if (!this.data_criacao) {
    this.data_criacao = now;
    this.ultimo_login = now;
  }
  next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
