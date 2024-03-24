const mongoose = require('mongoose')

const connection = async () => {
    try{
        await mongoose.connect("mongodb://localhost/lab")

    } catch (error){
        console.log(error)
        throw new Error ('Cannot connect to the database')
    }
}

module.exports = connection