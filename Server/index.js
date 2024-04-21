import express from 'express';
import cors from 'cors';
import { adminRouter } from './Routes/AdminRoute.js';
import { teacherRouter } from './Routes/TeacherRoute.js';
import { childRouter } from './Routes/ChildRoute.js';
import JWT, { decode } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const app = express();

// This middleware enables CORS for my Express app, allowing it to accept requests from any domain.
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// Convert data from front-end to json format
app.use(express.json())
app.use(cookieParser())
app.use('/auth', adminRouter)
app.use('/teacher', teacherRouter)
app.use('/child', childRouter)
app.use(express.static('public'))

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})