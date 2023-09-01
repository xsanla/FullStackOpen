const http = require('http')

const express = require('express')
const { time } = require('console')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'

  ].join(' ')
}))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => {
    res.send(result)
  })
})

app.get('/info', (req, res) => {
  const d = new Date
  Person.find({}).then(result => {
    res.send(`<p1> Phonebook has info for ${result.length} people<br>${d}`)
  })

})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findOne({_id: id}).then(result => {
    if (result.length != 0) {
      res.send(result)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(result => {
    res.send(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const pers = {
    name: req.body.name,
    number: req.body.number
  }
  Person.findByIdAndUpdate(req.params.id, pers, {new:true})
    .then(updateddPerson => {
      res.json(updateddPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons',async (req, res) => {
  const newPerson = req.body
  console.log(newPerson.name)
  const newbie = new Person({
    name: newPerson.name,
    number: newPerson.number
  })
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'name and or number missing'
    })
  }

  async function documentExists(client, name) {
    const document = await client.findOne({name: name})
    return !!document;
  }
  if (await documentExists(Person, newPerson.name)){
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  else {
    newbie.save().then(result => {
      res.json(newPerson)
    })
  }
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})