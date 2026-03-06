import { Router } from 'express';
import { addSkill, getMySkills, getSkillsCatalog, removeSkill, updateSkill } from '../controllers/skillsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/catalog', protect, getSkillsCatalog);
router.get('/mine', protect, getMySkills);
router.post('/mine', protect, addSkill);
router.patch('/mine/:id', protect, updateSkill);
router.delete('/mine/:id', protect, removeSkill);

export default router;
