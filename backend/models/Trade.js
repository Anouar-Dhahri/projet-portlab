import mongoose from 'mongoose'

const TradeSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  shipId: {
    type: String,
    required: true,
  },
  escale: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  tonnageTotal: {
    type: String,
    required: true,
  },
  countryDepart: {
    type: String,
    required: true,
  },
  countryDestination: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  }
},{ timestamps: true })

const Trade = mongoose.model('Trade', TradeSchema);

export { Trade }