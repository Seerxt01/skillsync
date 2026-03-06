import Skill from '../models/Skill.js';
import UserSkill from '../models/UserSkill.js';

export const getSkillsCatalog = async (_req, res) => {
  const skills = await Skill.find().sort({ category: 1, skillName: 1 });
  return res.json(skills);
};

export const getMySkills = async (req, res) => {
  const entries = await UserSkill.find({ user: req.user._id }).populate('skill');
  return res.json(entries);
};

export const addSkill = async (req, res) => {
  const { skillName, category, type, proficiencyLevel } = req.body;

  const skill = await Skill.findOneAndUpdate(
    { skillName },
    { $setOnInsert: { skillName, category } },
    { new: true, upsert: true }
  );

  const entry = await UserSkill.findOneAndUpdate(
    { user: req.user._id, skill: skill._id, type },
    { proficiencyLevel },
    { new: true, upsert: true }
  ).populate('skill');

  return res.status(201).json(entry);
};

export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { proficiencyLevel } = req.body;
  const entry = await UserSkill.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { proficiencyLevel },
    { new: true }
  ).populate('skill');

  if (!entry) {
    return res.status(404).json({ message: 'Skill not found.' });
  }

  return res.json(entry);
};

export const removeSkill = async (req, res) => {
  const { id } = req.params;
  const deleted = await UserSkill.findOneAndDelete({ _id: id, user: req.user._id });

  if (!deleted) {
    return res.status(404).json({ message: 'Skill not found.' });
  }

  return res.json({ message: 'Skill removed.' });
};
