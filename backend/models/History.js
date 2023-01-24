import mongoose from 'mongoose'

const HistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  action: {
    type: String,
    required: true,
  }
}, {timestamps: true})

const History = mongoose.model('History', HistorySchema);

export { History }