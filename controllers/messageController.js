import { Message } from "../models/Message.js";

export const sendMessage = async (req, res) => {
    const { content, room } = req.body;

    if(!content || !room) {
        return res.status(400).json({ message: "Content and room are required" });
    }

    try {
        const newMessage = await Message.create({
            content,
            sender: req.user._id,
            room
        })
        const populatedMsg = await newMessage.populate('sender', 'username')

        res.status(201).json({ message: populatedMsg, message: "Message sent successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Message creation failed...', error: error.message })
    }
}


//Fetch Messages by Room (with pagination)

export const getMessageByRoom = async (req, res) => {
    const { roomId } = req.params.roomId
    const { page = 1, limit = 20 } = req.query;

    try {
        const messages = await Message.find({ room: roomId})
            .populate('sender', 'username')
            .sort({ createdAt: -1})
            .skip((page - 1) * limit)
            .limit(Number(limit))

        res.status(200).json({ message: "Messages fetched successfully", messages })
    } catch (error) {
        res.status(500).json({ message: 'Message fetch failed...', error: error.message })
    }
}


//Update a Message (Only by Sender)

export const updateMessage = async (req, res) => {
    const messageId = req.params.id
    const { content } = req.body

    try {
        const message = await Message.findById(messageId)

        if(!messageId) return res.status(400).json({ message: "Message not found" })

        if(message.sender.toString() !== req.user._id.toString()){
            return res.status(401).json({ message: "You are not authorized to update this message" })
        }
        message.content = content
        await message.save()

        res.json({ message: "Message updated successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Message update failed...', error: error.message })
    }
}

//Delete a Message (Only by Sender)

export const deleteMessage = async (req, res) => {
    const messageId = req.params.id

    try {
        const message = await Message.findById(messageId)

        if(!messageId) return res.status(400).json({ message: "Message not found" })
        
        if(message.sender.toString() !== req.user._id.toString()){
            return res.status(401).json({ message: "You are not authorized to delete this message" })
        }

        await message.deleteOne()
        res.json({ message: "Message deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Message deletion failed...', error: error.message })
    }

}