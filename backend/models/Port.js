import mongoose from 'mongoose'

const PortSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const Port = mongoose.model('Port', PortSchema);

export { Port }