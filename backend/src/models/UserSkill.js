import mongoose from 'mongoose';

const userSkillSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
    type: { type: String, enum: ['teach', 'learn'], required: true },
    proficiencyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Beginner'
    }
  },
  { timestamps: true }
);

userSkillSchema.index({ user: 1, skill: 1, type: 1 }, { unique: true });

export default mongoose.model('UserSkill', userSkillSchema);
