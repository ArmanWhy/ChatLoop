import express from 'express'
import { createRoom, getRooms } from '../controllers/roomController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, createRoom)   //creates room
router.get('/', protect, getRooms)      //gets rooms

export default router
