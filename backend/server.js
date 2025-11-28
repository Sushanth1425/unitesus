const express= require('express')
require('dotenv').config()
const cors= require('cors')
const helmet= require('helmet')

const connetDB= require('./config/db')
connetDB()

const app= express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'PUT', 'DELETE', 'POST', 'PATCH'],
  credentials: true
}))
app.use(express.json())
app.use(helmet())

const authRoutes= require('./routes/authRoutes')
const empRoutes= require('./routes/employeeRoutes')
const taskRoutes= require('./routes/taskRoutes')
const dashRoutes= require('./routes/dashboardRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/employees', empRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/dashboard', dashRoutes)

app.get("/", (req, res)=> {res.send(`uniteSUS Running on ${process.env.PORT}`)})

const port= process.env.PORT || 5050
app.listen(port, ()=>console.log(`Server running on port ${port}`))