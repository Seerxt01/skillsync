import mongoose from 'mongoose';
import 'dotenv/config';
import Skill from '../models/Skill.js';

const catalog = [
  { skillName: 'Wind Energy Systems', category: 'Green Skills' },
  { skillName: 'Electric Vehicle Repair', category: 'Green Skills' },
  { skillName: 'Hydroponic Farming', category: 'Green Skills' },
  { skillName: 'Renewable Energy Consulting', category: 'Green Skills' },
  { skillName: 'Sustainable Architecture', category: 'Green Skills' },
  { skillName: 'JavaScript', category: 'Popular Skills' },
  { skillName: 'React', category: 'Popular Skills' },
  { skillName: 'Node.js', category: 'Popular Skills' },
  { skillName: 'Graphic Design', category: 'Popular Skills' },
  { skillName: 'Photography', category: 'Popular Skills' },
  { skillName: 'Video Editing', category: 'Popular Skills' },
  { skillName: 'Digital Marketing', category: 'Popular Skills' },
  { skillName: 'Spanish', category: 'Popular Skills' }
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillsync');
  await Skill.insertMany(catalog, { ordered: false }).catch(() => {});
  console.log('Seeded skills catalog');
  await mongoose.disconnect();
};

run();
