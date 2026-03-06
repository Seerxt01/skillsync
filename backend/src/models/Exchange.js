import mongoose from 'mongoose';

const exchangeSchema = new mongoose.Schema(
  {
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    learner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skillTaught: { type: String, required: true },
    skillLearned: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Active', 'Completed'], default: 'Pending' },
    rating: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Exchange', exchangeSchema);
