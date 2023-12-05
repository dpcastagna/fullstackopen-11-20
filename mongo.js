const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument') // eslint-disable-line no-console
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.fmaau.mongodb.net/personApp?retryWrites=true&w=majority`


mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:') // eslint-disable-line no-console
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`) // eslint-disable-line no-console
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then(result => { // eslint-disable-line no-unused-vars
    console.log(`added ${name} number ${number} to phonebook`) // eslint-disable-line no-console
    mongoose.connection.close()
  })
}
