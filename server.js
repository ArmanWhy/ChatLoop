import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import http from 'http'
// import { server } from './socket.js'


import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import { generalLimiter } from './middleware/rateLimiter.js'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'




//config
dotenv.config()
connectDB()


const app = express()
// const server = http.createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST']
//     }
// })


//middleware
app.use(cors())
app.use(express.json())
app.use(generalLimiter)

//routes
app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

//test routes

app.get('/', (req, res)=> {
    res.send('ChatLoop API is running...')
})

//socket io setup
// io.on('connection', (socket)=> {
//     console.log('✅ New client connected:', socket.id)

//     //join room
//     socket.on('joinRoom', (roomId) => {
//         socket.join(roomId)
//         console.log(`📦 Socket ${socket.id} joined room ${roomId}`)
//     })

//     //Handle New Message

//     socket.on('sendMessage', async ({ roomId, content, sender }) => {
//         // Broadcast message to room (without saving to DB for now)
//         io.to(roomId).emit('newMessage', {
//             roomId,
//             content,
//             sender,
//             createdAt: new Date().toDateString()
//         })
//     })

//     //Disconnect
//     socket.on('disconnect', () => {
//         console.log(`📦 Socket ${socket.id} disconnected`)
//     })
// })


const PORT = process.env.PORT || 5000

app.listen(5000, '0.0.0.0', () => {
  console.log(`Server running on port 5000`);
});