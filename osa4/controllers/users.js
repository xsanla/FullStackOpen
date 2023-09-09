const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(request, response) =>{
    const users = await User
        .find({})
        .populate('blogs', {url:1, title:1, author:1, id:1})

    response.json(users)
})
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const minlength = 3
    if (password.length < minlength){
        response.status(400).send({error: "Password minimum lenght is 3"})
        return
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
    try{
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch(exception){
        response.status(400).send({error: exception.message})
    }
  })
  
  module.exports = usersRouter