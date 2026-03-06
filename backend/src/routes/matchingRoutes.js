import { Router } from 'express';
import { findMatches } from '../controllers/matchingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/', protect, findMatches);

export default router;
