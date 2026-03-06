import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    exchange: { type: mongoose.Schema.Types.ObjectId, ref: 'Exchange', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true, trim: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
