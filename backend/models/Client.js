import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
  companie: {
    type: String,
    required: true,
  },
  representative: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
},{ timestamps: true })

const Client = mongoose.model('Client', ClientSchema);

export { Client }