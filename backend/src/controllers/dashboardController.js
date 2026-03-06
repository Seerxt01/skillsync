import Exchange from '../models/Exchange.js';
import UserSkill from '../models/UserSkill.js';
import { getNextLevelTarget } from '../utils/levels.js';

export const getDashboardData = async (req, res) => {
  const userId = req.user._id;

  const [allExchanges, skills] = await Promise.all([
    Exchange.find({ $or: [{ teacher: userId }, { learner: userId }] }).sort({ createdAt: -1 }).limit(8),
    UserSkill.find({ user: userId }).populate('skill')
  ]);

  const stats = {
    points: req.user.points,
    completed: allExchanges.filter((exchange) => exchange.status === 'Completed').length,
    active: allExchanges.filter((exchange) => exchange.status === 'Active').length,
    pending: allExchanges.filter((exchange) => exchange.status === 'Pending').length
  };

  const nextTarget = getNextLevelTarget(req.user.level);
  const progress = Math.min(100, Math.floor((req.user.points / nextTarget) * 100));

  return res.json({
    user: req.user,
    stats,
    progress,
    skillsOffer: skills.filter((entry) => entry.type === 'teach'),
    skillsLearn: skills.filter((entry) => entry.type === 'learn'),
    activities: allExchanges
  });
};
