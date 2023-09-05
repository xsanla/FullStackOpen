const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.likes === undefined){
        body.likes = 0
    }
    if (body.title === undefined || body.url === undefined){
        response.status(400).send()
    }

    const blog = new Blog({
        _id: body._id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        __v: body.__v
    })

    const posted = await blog.save()
    response.status(201).json(posted)
})

module.exports = blogsRouter