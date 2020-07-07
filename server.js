const express = require('express')
const app = express()

const usersUrl = require('./api/users')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }, () => console.log('Connected to DB'))

app.use(express.json())
app.use('/api/users', usersUrl)

app.listen(3000, () => console.log("server is running"))