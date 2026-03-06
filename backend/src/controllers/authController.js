import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, location } = req.body;
    if (!name || !email || !password || !confirmPassword || !location) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, location });

    return res.status(201).json({
      token: createToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, location: user.location, points: user.points, level: user.level }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to sign up user.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const matches = await bcrypt.compare(password, user.password);
    if (!matches) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    return res.json({
      token: createToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        points: user.points,
        level: user.level
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to log in.' });
  }
};
