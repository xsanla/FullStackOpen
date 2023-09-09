const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
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
    await User.deleteMany({})
    let blogObject = new Blog(inititalBlogs[0])
    await blogObject.save()
    blogObject = new Blog(inititalBlogs[1])
    await blogObject.save()
})

test('all blogs are returned', async () => {
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
    const testUserData = {
        username: "testing",
        name: "tse",
        password: "1234"
    }
    const testUser = await api.post('/api/users').send(testUserData)
    const login = await api.post('/api/login').send({ username: testUser.body.username, password: "1234" })
    const response = await api.post('/api/blogs')
        .set('Authorization', 'Bearer ' + login.body.token)
        .send(newBlog)
    expect(response.status).toBe(201)
    const response2 = await api.get('/api/blogs')
    const amount = response2.body.length
    expect(amount).toBe(3)
})

test('if likes value is not assigned check that its 0', async () => {
    const newBlog =
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        __v: 0
    }
    const testUserData = {
        username: "testing",
        name: "tse",
        password: "1234"
    }
    const testUser = await api.post('/api/users').send(testUserData)
    const login = await api.post('/api/login').send({ username: testUser.body.username, password: "1234" })
    await Blog.deleteMany({})
    await api.post('/api/blogs')
        .set('Authorization', 'Bearer ' + login.body.token)
        .send(newBlog)
    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toEqual(0)
})

test('POST request without title or url field returns bad request', async () => {
    const newBlog =
    {
        _id: '5a422aa71b54a676234d17f7',
        author: 'Edsger W. Dijkstra',
        likes: 5,
        __v: 0
    }
    const testUserData = {
        username: "testing",
        name: "tse",
        password: "1234"
    }
    const testUser = await api.post('/api/users').send(testUserData)
    const login = await api.post('/api/login').send({ username: testUser.body.username, password: "1234" })
    const response = await api.post('/api/blogs')
        .set('Authorization', 'Bearer ' + login.body.token)
        .send(newBlog)
    expect(response.status).toBe(400)
})

test('blog can be deleted succesfully', async () => {
    const newBlog =
    {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
    const testUserData = {
        username: "testing",
        name: "tse",
        password: "1234"
    }
    const testUser = await api.post('/api/users').send(testUserData)
    const login = await api.post('/api/login').send({ username: testUser.body.username, password: "1234" })
    const response = await api.post('/api/blogs')
        .set('Authorization', 'Bearer ' + login.body.token)
        .send(newBlog)
    await api.delete('/api/blogs/5a422aa71b54a676234d17f9')
        .set('Authorization', 'Bearer ' + login.body.token)
    const response1 = await api.get('/api/blogs')
    const amount = response1.body.length
    expect(amount).toBe(2)
})

test('blog cannot be created without authorization', async () => {
    const newBlog =
    {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
    const response = await api.post('/api/blogs')
        .send(newBlog)
    expect(response.status).toBe(401)
})

test('blog can be updated succesfully', async () => {
    const blog = {

        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 12,
        __v: 0

    }

    await api.put('/api/blogs/5a422a851b54a676234d17f7').send(blog)
    const response2 = await api.get('/api/blogs')
    expect(response2.body[0].likes).toBe(12)
})
afterAll(async () => {
    await mongoose.connection.close()
})