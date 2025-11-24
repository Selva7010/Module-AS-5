

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoutes.js'
import router from './routes/customerRoutes.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()

// MIDDLEWARE MUST COME BEFORE ROUTES
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

// ROUTES
app.use('/api/auth', authRouter)
app.use("/api/TaskManager", router)

app.get('/', (req, res) => res.send('API Working'))

app.listen(port, () => console.log(`Server started on PORT: ${port}`))
