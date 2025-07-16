import { Room } from "../models/Room.js";

export const createRoom = async (req, res) => {
    const { name, type } = req.body;
    const userId = req.user._id
    try {
        const newRoom = await Room.create({
            name,
            type,
            createdBy: userId,
            members: [userId]
        })
        res.status(201).json({ room: newRoom, message: "Room created successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Room creation failed...', error: error.message })
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ 
        $or: [
            { type: 'public' },
            { members: req.user._id  }
        ]
    }).populate('createdBy')
    res.status(200).json({ message: "Rooms fetched successfully", rooms })
    } catch (error) {
        res.status(500).json({ message: 'Room fetch failed...', error: error.message })
    }
}