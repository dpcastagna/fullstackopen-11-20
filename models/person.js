const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url) // eslint-disable-line no-console
mongoose.connect(url)
  .then(result => { // eslint-disable-line no-unused-vars
    console.log('connected to MongoDB') // eslint-disable-line no-console
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message) // eslint-disable-line no-console
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8,
    validate : {
      validator: function(v) {
        return /\d{2,3}-\d{7,8}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'number missing']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)