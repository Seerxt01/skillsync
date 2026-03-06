import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    rating: { type: Number, default: 4.5 },
    xpProgress: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
