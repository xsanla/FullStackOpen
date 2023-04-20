require.env('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const url = process.env.MONGODB_URI


mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5) {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    // hae oliot tietokannasta
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(element => {
            console.log(element.name + " " + element.number)

        });
        mongoose.connection.close()
    })
}
