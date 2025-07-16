import express from 'express'
import { sendMessage } from '../controllers/messageController.js'
import { protect } from '../middleware/auth.js'
import { messageLimiter } from '../middleware/rateLimiter.js'
import { getMessageByRoom } from '../controllers/messageController.js'
import { updateMessage } from '../controllers/messageController.js'
import { deleteMessage } from '../controllers/messageController.js'


const router = express.Router()

router.post('/', protect, messageLimiter, sendMessage)
router.get('/:roomId', protect, getMessageByRoom)
router.put('/:id', protect, updateMessage)
router.delete('/:id', protect, deleteMessage)

export default router
