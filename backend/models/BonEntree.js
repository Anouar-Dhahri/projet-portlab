import mongoose from 'mongoose'

const bonEntreeSchema = new mongoose.Schema({
  TradeId: {
    type: String,
    required: true,
  },
  tonnageEntree: {
    type: String,
    required: true,
  },
  tonnageRestant: {
    type: String,
    required: true,
  },
  dateLimiteEntree: {
    type: String,
    required: true,
  },
  tonnageAEntree: {
    type: String,
    required: true,
  }
},{ timestamps: true })

const BonEntree = mongoose.model('BonEntree', bonEntreeSchema);

export { BonEntree }