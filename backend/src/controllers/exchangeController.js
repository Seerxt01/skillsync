import Exchange from '../models/Exchange.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import { getLevelFromPoints } from '../utils/levels.js';

const rewardPoints = {
  teach: 50,
  learn: 20,
  complete: 30
};

export const getExchanges = async (req, res) => {
  const exchanges = await Exchange.find({ $or: [{ teacher: req.user._id }, { learner: req.user._id }] })
    .populate('teacher learner', 'name')
    .sort({ createdAt: -1 });
  return res.json(exchanges);
};

export const createExchange = async (req, res) => {
  const { partnerId, skillTaught, skillLearned } = req.body;
  const exchange = await Exchange.create({
    teacher: req.user._id,
    learner: partnerId,
    skillTaught,
    skillLearned,
    status: 'Pending'
  });
  return res.status(201).json(exchange);
};

export const updateStatus = async (req, res) => {
  const exchange = await Exchange.findById(req.params.id);
  if (!exchange) {
    return res.status(404).json({ message: 'Exchange not found.' });
  }

  exchange.status = req.body.status;

  if (req.body.status === 'Completed') {
    const [teacher, learner] = await Promise.all([User.findById(exchange.teacher), User.findById(exchange.learner)]);

    teacher.points += rewardPoints.teach + rewardPoints.complete;
    learner.points += rewardPoints.learn + rewardPoints.complete;
    teacher.level = getLevelFromPoints(teacher.points);
    learner.level = getLevelFromPoints(learner.points);

    await Promise.all([teacher.save(), learner.save()]);
  }

  await exchange.save();
  return res.json(exchange);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find({ exchange: req.params.exchangeId }).populate('sender', 'name').sort({ timestamp: 1 });
  return res.json(messages);
};

export const sendMessage = async (req, res) => {
  const message = await Message.create({
    exchange: req.params.exchangeId,
    sender: req.user._id,
    message: req.body.message
  });

  await message.populate('sender', 'name');
  return res.status(201).json(message);
};
