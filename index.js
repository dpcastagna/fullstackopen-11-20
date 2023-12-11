require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  // eslint-disable-next-line no-console
  console.log('Method:', request.method)
  console.log('Path:  ', request.path) // eslint-disable-line no-console
  console.log('Body:  ', request.body) // eslint-disable-line no-console
  console.log('---') // eslint-disable-line no-console
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(requestLogger)
morgan.token('body', function (req, res) { return JSON.stringify(req.body) }) // eslint-disable-line no-unused-vars
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${Date()}</p>`)
  })
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => { // eslint-disable-line no-unused-vars
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', async (request, response, next) => {
  const body = request.body
  const persons = await Person.find({})
  //person.id = Math.floor(Math.random() * 1000000000000000)
  if (body.name === '') {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (body.number === '') {
    return response.status(400).json({
      error: 'number missing'
    })
  } else if(persons.filter(p => p.name === body.name).length > 0) {
    //console.log(persons.filter(p => p.name === person.name).length)
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message) // eslint-disable-line no-console

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) // eslint-disable-line no-console
})
