import User from '../models/User.js';
import UserSkill from '../models/UserSkill.js';

const levelWeight = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };

const getMatchPercentage = (offerSkill, wantedSkill, locationMatch) => {
  const expScore = Math.min(levelWeight[offerSkill.proficiencyLevel] || 1, 4) * 10;
  const locationScore = locationMatch ? 20 : 10;
  return Math.min(100, 45 + expScore + locationScore);
};

export const findMatches = async (req, res) => {
  const { search = '', location = '', level = '' } = req.query;
  const currentUserId = req.user._id;

  const mySkills = await UserSkill.find({ user: currentUserId }).populate('skill');
  const myLearn = mySkills.filter((entry) => entry.type === 'learn').map((entry) => entry.skill.skillName);
  const myTeach = mySkills.filter((entry) => entry.type === 'teach').map((entry) => entry.skill.skillName);

  const users = await User.find({ _id: { $ne: currentUserId } }).limit(50);
  const userIds = users.map((user) => user._id);
  const skillMap = await UserSkill.find({ user: { $in: userIds } }).populate('skill');

  const grouped = userIds.reduce((acc, id) => ({ ...acc, [id]: [] }), {});
  skillMap.forEach((row) => grouped[row.user.toString()]?.push(row));

  const matches = users
    .map((user) => {
      const userSkills = grouped[user._id.toString()] || [];
      const offers = userSkills.filter((entry) => entry.type === 'teach');
      const wants = userSkills.filter((entry) => entry.type === 'learn');

      const offerHit = offers.find((entry) => myLearn.includes(entry.skill.skillName));
      const wantHit = wants.find((entry) => myTeach.includes(entry.skill.skillName));

      if (!offerHit || !wantHit) {
        return null;
      }

      const locationMatch = user.location.toLowerCase() === req.user.location.toLowerCase();
      const matchPercentage = getMatchPercentage(offerHit, wantHit, locationMatch);

      return {
        id: user._id,
        name: user.name,
        location: user.location,
        rating: user.rating,
        skillsOffered: offers.map((entry) => entry.skill.skillName),
        skillsWanted: wants.map((entry) => entry.skill.skillName),
        matchPercentage,
        level: user.level
      };
    })
    .filter(Boolean)
    .filter((match) => (search ? [...match.skillsOffered, ...match.skillsWanted].join(' ').toLowerCase().includes(search.toLowerCase()) : true))
    .filter((match) => (location ? match.location.toLowerCase().includes(location.toLowerCase()) : true))
    .filter((match) => (level ? String(match.level) === String(level) : true))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  return res.json(matches);
};
