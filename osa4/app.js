const blogsRouter = require('./controllers/blogs')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const config = require('./utils/config')


mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app