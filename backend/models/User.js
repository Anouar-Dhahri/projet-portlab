import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  plainPassword:{
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
},{ timestamps: true })

const User = mongoose.model('User', UserSchema);

export { User }