const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const addNewOffersRoute = require('./routes/addNewOffers')
const authenticateToken = require('./middleware/authenticateToken')

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/addNewOffers', authenticateToken, addNewOffersRoute)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))