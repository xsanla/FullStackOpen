const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

const inititalBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(inititalBlogs[0])
    await blogObject.save()
    blogObject = new Blog(inititalBlogs[1])
    await blogObject.save()
})

test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(inititalBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are identified by id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]._id).toBeDefined()
    expect(response.body[1]._id).toBeDefined()
})

test('blog can be added succcessfully', async () => {
    const newBlog = 
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(201)
    const response2 = await api.get('/api/blogs')
    const amount = response2.body.length
    expect(amount).toBe(3)
})

test('if likes value is not assigned check that its 0', async () =>{
    const newBlog = 
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            __v: 0
        }

    await Blog.deleteMany({})
    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toEqual(0)
})

test('POST request without title or url field returns bad request', async () =>{
    const newBlog = 
    {
        _id: '5a422aa71b54a676234d17f7',
        author: 'Edsger W. Dijkstra',
        likes: 5,
        __v: 0
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(400)
})
afterAll(async () => {
  await mongoose.connection.close()
})