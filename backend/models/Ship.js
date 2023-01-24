import mongoose from 'mongoose'

const ShipSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  tonnage: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const Ship = mongoose.model('Ship', ShipSchema);

export { Ship }