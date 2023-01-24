import mongoose from 'mongoose'

const bonSortieSchema = new mongoose.Schema({
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
  dateLimiteSortie: {
    type: String,
    required: true,
  },
  tonnageAEnlever: {
    type: String,
    required: true,
  }
},{ timestamps: true })

const BonSortie = mongoose.model('BonSortie', bonSortieSchema);

export { BonSortie }