import { Router } from 'express';
import { createExchange, getExchanges, getMessages, sendMessage, updateStatus } from '../controllers/exchangeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getExchanges);
router.post('/', protect, createExchange);
router.patch('/:id/status', protect, updateStatus);
router.get('/:exchangeId/messages', protect, getMessages);
router.post('/:exchangeId/messages', protect, sendMessage);

export default router;
