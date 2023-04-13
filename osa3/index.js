const http = require('http')

const express = require('express')
const { time } = require('console')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req,res),
    tokens.url(req,res),
    tokens.status(req,res),
    tokens.res(req,res,'content-length'),'-',
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
  res.json(persons)
})

app.get('/info', (req, res) => {
  const d = new Date
  res.send(`<p1> Phonebook has info for ${persons.length} people<br>${d}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  let number = persons.filter(i => i.id == id)
  if (number.length != 0) {
    res.send(number)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(i => i.id != id)
  res.send(204).end()
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  newPerson.id = Math.floor(Math.random() * 1000)
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'name and or number missing'
    })
  }
  if (persons.find(n => n.name == newPerson.name) != undefined) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})