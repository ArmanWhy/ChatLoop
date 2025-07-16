import express from 'express'
import { getProfile, listUsers, updateUser } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/me', protect, getProfile)
router.put('/me', protect, updateUser)
router.get('/', protect, listUsers)


export default router

