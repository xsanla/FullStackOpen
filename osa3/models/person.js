require('dotenv').config()
const mongoose = require('mongoose')


const url = process.env.MONGODB_URI


mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function(value){
                return /^\d{3}-\d{4,}$|^\d{2}-\d{5,}$/.test(value)
            },
            message: 'Number must match the pattern XXX-XXXX.... or XX-XXXXX....'
        },
        required: true
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

